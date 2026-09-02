import { createClient } from "@libsql/client";
import { chinaSeedProfiles } from "@/db/seed/china-seed-profiles";
import { germanySeedProfiles } from "@/db/seed/germany-seed-profiles";
import { indiaSeedProfiles } from "@/db/seed/india-seed-profiles";
import { seedEmail, type SeedMember } from "@/db/seed/seed-member-shape";
import { unitedStatesSeedProfiles } from "@/db/seed/united-states-seed-profiles";
import { loadEnvFileForScripts } from "@/db/load-env-file-for-scripts";

loadEnvFileForScripts();

const seedEmailDomain = "@seed.heartbridge.local";

function allSeedMembers(): SeedMember[] {
  return [
    ...indiaSeedProfiles,
    ...chinaSeedProfiles,
    ...unitedStatesSeedProfiles,
    ...germanySeedProfiles,
  ];
}

function requireTursoUrl() {
  const url = process.env.TURSO_DATABASE_URL;
  if (!url) {
    throw new Error("TURSO_DATABASE_URL is not set. Add it to .env before seeding.");
  }
  return url;
}

async function deletePreviousSeedRows(client: ReturnType<typeof createClient>) {
  const seedUsers = await client.execute({
    sql: `SELECT id FROM "user" WHERE email LIKE ?`,
    args: [`%${seedEmailDomain}`],
  });
  const seedUserIds = seedUsers.rows.map((row) => String(row.id));
  if (seedUserIds.length === 0) {
    return;
  }

  const placeholders = seedUserIds.map(() => "?").join(", ");
  const statements: Array<{ sql: string; args: string[] }> = [
    {
      sql: `DELETE FROM message WHERE sender_user_id IN (${placeholders})`,
      args: seedUserIds,
    },
    {
      sql: `DELETE FROM conversation WHERE member_a_id IN (${placeholders}) OR member_b_id IN (${placeholders})`,
      args: [...seedUserIds, ...seedUserIds],
    },
    {
      sql: `DELETE FROM profile_like WHERE liker_user_id IN (${placeholders}) OR liked_user_id IN (${placeholders})`,
      args: [...seedUserIds, ...seedUserIds],
    },
    {
      sql: `DELETE FROM profile_bookmark WHERE bookmarker_user_id IN (${placeholders}) OR bookmarked_user_id IN (${placeholders})`,
      args: [...seedUserIds, ...seedUserIds],
    },
    {
      sql: `DELETE FROM profile_block WHERE blocker_user_id IN (${placeholders}) OR blocked_user_id IN (${placeholders})`,
      args: [...seedUserIds, ...seedUserIds],
    },
    {
      sql: `DELETE FROM profile_report WHERE reporter_user_id IN (${placeholders}) OR reported_user_id IN (${placeholders})`,
      args: [...seedUserIds, ...seedUserIds],
    },
    {
      sql: `DELETE FROM partner_preference WHERE user_id IN (${placeholders})`,
      args: seedUserIds,
    },
    {
      sql: `DELETE FROM matrimonial_profile WHERE user_id IN (${placeholders})`,
      args: seedUserIds,
    },
    {
      sql: `DELETE FROM "user" WHERE id IN (${placeholders})`,
      args: seedUserIds,
    },
  ];

  for (const statement of statements) {
    await client.execute(statement);
  }
}

async function insertSeedMember(client: ReturnType<typeof createClient>, member: SeedMember, timestamp: string) {
  await client.execute({
    sql: `
      INSERT INTO "user" (id, name, email, emailVerified, image, createdAt, updatedAt, role, banned)
      VALUES (?, ?, ?, 1, ?, ?, ?, 'user', 0)
    `,
    args: [
      member.userId,
      member.displayName,
      seedEmail(member.emailLocalPart),
      member.photoPath,
      timestamp,
      timestamp,
    ],
  });

  await client.execute({
    sql: `
      INSERT INTO matrimonial_profile (
        user_id, display_name, country, gender, seeking_gender, date_of_birth, height_cm,
        city, region, religion, education, education_band, profession,
        annual_income_amount, income_currency, marital_status, diet, smoking, drinking,
        about_me, mother_tongue, community, family_type, is_only_child, has_children,
        wants_children, languages_spoken, ethnicity, is_manglik, photo_path, medical_status,
        medical_notes, hide_income,
        photos_visible_to, is_paused, is_verified, privacy_consent_at,
        seed_will_reciprocate_likes, created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?,
        'everyone', 0, 1, ?,
        ?, ?, ?
      )
    `,
    args: [
      member.userId,
      member.displayName,
      member.country,
      member.gender,
      member.seekingGender,
      member.dateOfBirth,
      member.heightCm,
      member.city,
      member.region,
      member.religion,
      member.education,
      member.educationBand,
      member.profession,
      member.annualIncomeAmount,
      member.incomeCurrency,
      member.maritalStatus,
      member.diet,
      member.smoking,
      member.drinking,
      member.aboutMe,
      member.motherTongue ?? null,
      member.community ?? null,
      member.familyType ?? null,
      member.isOnlyChild === undefined ? null : member.isOnlyChild ? 1 : 0,
      member.hasChildren,
      member.wantsChildren,
      JSON.stringify(member.languagesSpoken),
      member.ethnicity ?? null,
      member.isManglik ?? null,
      member.photoPath,
      member.medicalStatus,
      member.medicalStatus === "has_notes" ? (member.medicalNotes ?? null) : null,
      member.hideIncome ? 1 : 0,
      member.country === "DE" ? timestamp : null,
      member.seedWillReciprocateLikes ? 1 : 0,
      timestamp,
      timestamp,
    ],
  });

  await client.execute({
    sql: `
      INSERT INTO partner_preference (
        user_id, min_age, max_age, min_height_cm, max_height_cm,
        countries, religions, education_bands, marital_statuses, diets,
        min_income_amount, min_income_currency, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, '[]', '[]', NULL, NULL, ?)
    `,
    args: [
      member.userId,
      member.preference.minAge,
      member.preference.maxAge,
      member.preference.minHeightCm,
      member.preference.maxHeightCm,
      JSON.stringify(member.preference.countries),
      JSON.stringify(member.preference.religions),
      JSON.stringify(member.preference.educationBands),
      timestamp,
    ],
  });
}

async function seedRelationships(client: ReturnType<typeof createClient>, timestamp: string) {
  const likes: Array<[string, string]> = [
    ["seed-karan-kapoor", "seed-priya-sharma"],
    ["seed-priya-sharma", "seed-karan-kapoor"],
    ["seed-ananya-singh", "seed-vikram-patel"],
    ["seed-wei-lin", "seed-yuna-chen"],
    ["seed-yuna-chen", "seed-wei-lin"],
    ["seed-daniel-okonkwo", "seed-maya-patel"],
    ["seed-maya-patel", "seed-daniel-okonkwo"],
    ["seed-lukas-weber", "seed-anna-keller"],
    ["seed-anna-keller", "seed-lukas-weber"],
    ["seed-sneha-roy", "seed-sameer-khan"],
  ];

  for (const [liker, liked] of likes) {
    await client.execute({
      sql: "INSERT INTO profile_like (liker_user_id, liked_user_id, created_at) VALUES (?, ?, ?)",
      args: [liker, liked, timestamp],
    });
  }

  const bookmarks: Array<[string, string]> = [
    ["seed-karan-kapoor", "seed-sanya-mehta"],
    ["seed-priya-sharma", "seed-deepa-nair"],
    ["seed-yuna-chen", "seed-mei-wang"],
    ["seed-maya-patel", "seed-sofia-nguyen"],
  ];

  for (const [bookmarker, bookmarked] of bookmarks) {
    await client.execute({
      sql: "INSERT INTO profile_bookmark (bookmarker_user_id, bookmarked_user_id, created_at) VALUES (?, ?, ?)",
      args: [bookmarker, bookmarked, timestamp],
    });
  }

  await client.execute({
    sql: "INSERT INTO conversation (id, member_a_id, member_b_id, created_at) VALUES (?, ?, ?, ?)",
    args: ["conversation-seed-karan-priya", "seed-karan-kapoor", "seed-priya-sharma", timestamp],
  });

  const messages: Array<[string, string]> = [
    ["seed-karan-kapoor", "Hi Priya — your profile made me smile. Would you like to talk?"],
    ["seed-priya-sharma", "Hello Karan. I would. How is Dehradun this week?"],
    ["seed-karan-kapoor", "Cool and rainy. Mumbai must be louder. How was your commute?"],
  ];

  for (const [sender, body] of messages) {
    await client.execute({
      sql: `
        INSERT INTO message (id, conversation_id, sender_user_id, body, created_at, read_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      args: [
        `message-seed-${sender}-${crypto.randomUUID()}`,
        "conversation-seed-karan-priya",
        sender,
        body,
        timestamp,
        timestamp,
      ],
    });
  }
}

async function seedMatrimonialDemoData() {
  const client = createClient({
    url: requireTursoUrl(),
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  const members = allSeedMembers();
  const timestamp = new Date().toISOString();

  await deletePreviousSeedRows(client);

  for (const member of members) {
    await insertSeedMember(client, member, timestamp);
  }

  await seedRelationships(client, timestamp);

  console.log(
    `Seeded ${members.length} demo members (${indiaSeedProfiles.length} India, ${chinaSeedProfiles.length} China, ${unitedStatesSeedProfiles.length} United States, ${germanySeedProfiles.length} Germany) plus likes, bookmarks, and one conversation.`,
  );
}

seedMatrimonialDemoData().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
