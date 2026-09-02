import { getTursoClient, nowAsIsoTimestamp } from "@/db/turso-client";
import {
  findMatrimonialProfileForUser,
  findPartnerPreferenceForUser,
} from "@/db/queries/find-matrimonial-profile-for-user";

export async function pauseOrUnpauseMyProfile(userId: string, isPaused: boolean) {
  await getTursoClient().execute({
    sql: "UPDATE matrimonial_profile SET is_paused = ?, updated_at = ? WHERE user_id = ?",
    args: [isPaused ? 1 : 0, nowAsIsoTimestamp(), userId],
  });
}

export async function exportMyAccountData(userId: string) {
  const client = getTursoClient();
  const [profile, preference, likes, bookmarks, blocks, reports, messages] = await Promise.all([
    findMatrimonialProfileForUser(userId),
    findPartnerPreferenceForUser(userId),
    client.execute({
      sql: "SELECT * FROM profile_like WHERE liker_user_id = ? OR liked_user_id = ?",
      args: [userId, userId],
    }),
    client.execute({
      sql: "SELECT * FROM profile_bookmark WHERE bookmarker_user_id = ?",
      args: [userId],
    }),
    client.execute({
      sql: "SELECT * FROM profile_block WHERE blocker_user_id = ? OR blocked_user_id = ?",
      args: [userId, userId],
    }),
    client.execute({
      sql: "SELECT * FROM profile_report WHERE reporter_user_id = ?",
      args: [userId],
    }),
    client.execute({
      sql: `
        SELECT message.*
        FROM message
        JOIN conversation ON conversation.id = message.conversation_id
        WHERE conversation.member_a_id = ? OR conversation.member_b_id = ?
      `,
      args: [userId, userId],
    }),
  ]);

  return {
    exportedAt: nowAsIsoTimestamp(),
    profile,
    preference,
    likes: likes.rows,
    bookmarks: bookmarks.rows,
    blocks: blocks.rows,
    reports: reports.rows,
    messages: messages.rows,
  };
}

/**
 * Removes every HeartBridge row for this user, then the Better Auth user row
 * (sessions and accounts cascade from user).
 */
export async function deleteMyAccountAndData(userId: string) {
  const client = getTursoClient();
  const timestamp = nowAsIsoTimestamp();

  await client.execute({
    sql: "DELETE FROM message WHERE sender_user_id = ?",
    args: [userId],
  });
  await client.execute({
    sql: "DELETE FROM conversation WHERE member_a_id = ? OR member_b_id = ?",
    args: [userId, userId],
  });
  await client.execute({
    sql: "DELETE FROM profile_like WHERE liker_user_id = ? OR liked_user_id = ?",
    args: [userId, userId],
  });
  await client.execute({
    sql: "DELETE FROM profile_bookmark WHERE bookmarker_user_id = ? OR bookmarked_user_id = ?",
    args: [userId, userId],
  });
  await client.execute({
    sql: "DELETE FROM profile_block WHERE blocker_user_id = ? OR blocked_user_id = ?",
    args: [userId, userId],
  });
  await client.execute({
    sql: "DELETE FROM profile_report WHERE reporter_user_id = ? OR reported_user_id = ?",
    args: [userId, userId],
  });
  await client.execute({
    sql: "DELETE FROM partner_preference WHERE user_id = ?",
    args: [userId],
  });
  await client.execute({
    sql: "DELETE FROM matrimonial_profile WHERE user_id = ?",
    args: [userId],
  });
  await client.execute({
    sql: `UPDATE "user" SET name = 'Deleted member', email = ?, image = NULL, updatedAt = ? WHERE id = ?`,
    args: [`deleted-${userId}@deleted.heartbridge.local`, timestamp, userId],
  });
  await client.execute({
    sql: `DELETE FROM "session" WHERE userId = ?`,
    args: [userId],
  });
  await client.execute({
    sql: `DELETE FROM "account" WHERE userId = ?`,
    args: [userId],
  });
  await client.execute({
    sql: `DELETE FROM "user" WHERE id = ?`,
    args: [userId],
  });
}

export async function saveContactMessage(input: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  body: string;
}) {
  const { createRandomId } = await import("@/db/turso-client");
  await getTursoClient().execute({
    sql: `
      INSERT INTO contact_message (id, first_name, last_name, email, phone, subject, body, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    args: [
      createRandomId("contact"),
      input.firstName,
      input.lastName,
      input.email,
      input.phone,
      input.subject,
      input.body,
      nowAsIsoTimestamp(),
    ],
  });
}
