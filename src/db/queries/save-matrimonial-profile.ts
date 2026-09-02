import { getTursoClient, nowAsIsoTimestamp, toSqliteBoolean } from "@/db/turso-client";
import type { PartnerPreference, ProfileWriteInput } from "@/db/types";

export async function saveMatrimonialProfile(profile: ProfileWriteInput) {
  const timestamp = nowAsIsoTimestamp();
  const client = getTursoClient();

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
        ?, ?, ?, ?, ?,
        ?, ?, ?, ?
      )
      ON CONFLICT(user_id) DO UPDATE SET
        display_name = excluded.display_name,
        country = excluded.country,
        gender = excluded.gender,
        seeking_gender = excluded.seeking_gender,
        date_of_birth = excluded.date_of_birth,
        height_cm = excluded.height_cm,
        city = excluded.city,
        region = excluded.region,
        religion = excluded.religion,
        education = excluded.education,
        education_band = excluded.education_band,
        profession = excluded.profession,
        annual_income_amount = excluded.annual_income_amount,
        income_currency = excluded.income_currency,
        marital_status = excluded.marital_status,
        diet = excluded.diet,
        smoking = excluded.smoking,
        drinking = excluded.drinking,
        about_me = excluded.about_me,
        mother_tongue = excluded.mother_tongue,
        community = excluded.community,
        family_type = excluded.family_type,
        is_only_child = excluded.is_only_child,
        has_children = excluded.has_children,
        wants_children = excluded.wants_children,
        languages_spoken = excluded.languages_spoken,
        ethnicity = excluded.ethnicity,
        is_manglik = excluded.is_manglik,
        photo_path = excluded.photo_path,
        medical_status = excluded.medical_status,
        medical_notes = excluded.medical_notes,
        hide_income = excluded.hide_income,
        photos_visible_to = excluded.photos_visible_to,
        is_paused = excluded.is_paused,
        privacy_consent_at = excluded.privacy_consent_at,
        updated_at = excluded.updated_at
    `,
    args: [
      profile.userId,
      profile.displayName,
      profile.country,
      profile.gender,
      profile.seekingGender,
      profile.dateOfBirth,
      profile.heightCm,
      profile.city,
      profile.region,
      profile.religion,
      profile.education,
      profile.educationBand,
      profile.profession,
      profile.annualIncomeAmount,
      profile.incomeCurrency,
      profile.maritalStatus,
      profile.diet,
      profile.smoking,
      profile.drinking,
      profile.aboutMe,
      profile.motherTongue,
      profile.community,
      profile.familyType,
      toSqliteBoolean(profile.isOnlyChild),
      profile.hasChildren,
      profile.wantsChildren,
      JSON.stringify(profile.languagesSpoken),
      profile.ethnicity,
      profile.isManglik,
      profile.photoPath,
      profile.medicalStatus,
      profile.medicalNotes,
      toSqliteBoolean(profile.hideIncome) ?? 0,
      profile.photosVisibleTo,
      toSqliteBoolean(profile.isPaused) ?? 0,
      toSqliteBoolean(profile.isVerified) ?? 0,
      profile.privacyConsentAt,
      toSqliteBoolean(profile.seedWillReciprocateLikes) ?? 0,
      timestamp,
      timestamp,
    ],
  });
}

export async function savePartnerPreference(
  preference: Omit<PartnerPreference, "updatedAt"> & { updatedAt?: string },
) {
  const timestamp = preference.updatedAt ?? nowAsIsoTimestamp();
  await getTursoClient().execute({
    sql: `
      INSERT INTO partner_preference (
        user_id, min_age, max_age, min_height_cm, max_height_cm,
        countries, religions, education_bands, marital_statuses, diets,
        min_income_amount, min_income_currency, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(user_id) DO UPDATE SET
        min_age = excluded.min_age,
        max_age = excluded.max_age,
        min_height_cm = excluded.min_height_cm,
        max_height_cm = excluded.max_height_cm,
        countries = excluded.countries,
        religions = excluded.religions,
        education_bands = excluded.education_bands,
        marital_statuses = excluded.marital_statuses,
        diets = excluded.diets,
        min_income_amount = excluded.min_income_amount,
        min_income_currency = excluded.min_income_currency,
        updated_at = excluded.updated_at
    `,
    args: [
      preference.userId,
      preference.minAge,
      preference.maxAge,
      preference.minHeightCm,
      preference.maxHeightCm,
      JSON.stringify(preference.countries),
      JSON.stringify(preference.religions),
      JSON.stringify(preference.educationBands),
      JSON.stringify(preference.maritalStatuses),
      JSON.stringify(preference.diets),
      preference.minIncomeAmount,
      preference.minIncomeCurrency,
      timestamp,
    ],
  });
}
