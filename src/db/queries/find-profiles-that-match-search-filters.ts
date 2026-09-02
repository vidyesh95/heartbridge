import { computeAgeFromDateOfBirth } from "@/domain/display/compute-age-from-date-of-birth";
import { mapSqlRowToMatrimonialProfile } from "@/db/map-sql-row-to-matrimonial-profile";
import { getTursoClient } from "@/db/turso-client";
import type { MatrimonialProfile, ProfileSearchFilters } from "@/db/types";

export type BrowsableProfile = MatrimonialProfile & {
  viewerHasLiked: boolean;
  viewerHasBookmarked: boolean;
};

/**
 * Browse grid query. SQL handles cheap filters; age is computed in JS because we never store it.
 * Blocked people (either direction) and paused profiles never appear.
 */
export async function findProfilesThatMatchSearchFilters(options: {
  viewerUserId: string;
  viewerGender?: "male" | "female";
  viewerSeekingGender?: "male" | "female";
  filters: ProfileSearchFilters;
}): Promise<BrowsableProfile[]> {
  const clauses = ["profile.is_paused = 0", "profile.user_id != ?"];
  const args: Array<string | number> = [options.viewerUserId];

  clauses.push(`
    profile.user_id NOT IN (
      SELECT blocked_user_id FROM profile_block WHERE blocker_user_id = ?
      UNION
      SELECT blocker_user_id FROM profile_block WHERE blocked_user_id = ?
    )
  `);
  args.push(options.viewerUserId, options.viewerUserId);

  if (options.filters.country && options.filters.country !== "all") {
    clauses.push("profile.country = ?");
    args.push(options.filters.country);
  }

  if (options.filters.gender === "all") {
    // Explicit "all" shows every gender, including people outside the viewer's seeking preference.
  } else if (options.filters.gender) {
    clauses.push("profile.gender = ?");
    args.push(options.filters.gender);
  } else if (options.viewerSeekingGender) {
    clauses.push("profile.gender = ?");
    args.push(options.viewerSeekingGender);
  }

  if (options.viewerGender) {
    clauses.push("profile.seeking_gender = ?");
    args.push(options.viewerGender);
  }

  if (options.filters.city?.trim()) {
    clauses.push("LOWER(profile.city) LIKE ?");
    args.push(`%${options.filters.city.trim().toLowerCase()}%`);
  }

  // Income numbers only make sense inside one currency, so we apply them when a country is chosen.
  if (options.filters.country && options.filters.country !== "all") {
    if (options.filters.incomeMin !== undefined) {
      clauses.push("profile.annual_income_amount >= ?");
      args.push(options.filters.incomeMin);
    }
    if (options.filters.incomeMax !== undefined) {
      clauses.push("profile.annual_income_amount <= ?");
      args.push(options.filters.incomeMax);
    }
  }

  if (options.filters.heightMinCm !== undefined) {
    clauses.push("profile.height_cm >= ?");
    args.push(options.filters.heightMinCm);
  }

  if (options.filters.heightMaxCm !== undefined) {
    clauses.push("profile.height_cm <= ?");
    args.push(options.filters.heightMaxCm);
  }

  appendInList(clauses, args, "profile.religion", options.filters.religions);
  appendInList(clauses, args, "profile.education_band", options.filters.educationBands);
  appendInList(clauses, args, "profile.marital_status", options.filters.maritalStatuses);

  const result = await getTursoClient().execute({
    sql: `
      SELECT
        profile.*,
        CASE WHEN liked.liked_user_id IS NULL THEN 0 ELSE 1 END AS viewer_has_liked,
        CASE WHEN bookmarked.bookmarked_user_id IS NULL THEN 0 ELSE 1 END AS viewer_has_bookmarked
      FROM matrimonial_profile AS profile
      LEFT JOIN profile_like AS liked
        ON liked.liked_user_id = profile.user_id AND liked.liker_user_id = ?
      LEFT JOIN profile_bookmark AS bookmarked
        ON bookmarked.bookmarked_user_id = profile.user_id AND bookmarked.bookmarker_user_id = ?
      WHERE ${clauses.join(" AND ")}
      ORDER BY profile.is_verified DESC, profile.created_at DESC
    `,
    args: [options.viewerUserId, options.viewerUserId, ...args],
  });

  const ageMin = options.filters.ageMin ?? 18;
  const ageMax = options.filters.ageMax ?? 118;

  return result.rows
    .map((row) => {
      const profile = mapSqlRowToMatrimonialProfile(row);
      const age = computeAgeFromDateOfBirth(profile.dateOfBirth);
      return {
        ...profile,
        viewerHasLiked: Number(row.viewer_has_liked) === 1,
        viewerHasBookmarked: Number(row.viewer_has_bookmarked) === 1,
        age,
      };
    })
    .filter((profile) => profile.age >= ageMin && profile.age <= ageMax)
    .map(({ age: _age, ...profile }) => profile);
}

function appendInList(
  clauses: string[],
  args: Array<string | number>,
  column: string,
  values: string[] | undefined,
) {
  if (!values || values.length === 0) {
    return;
  }
  const placeholders = values.map(() => "?").join(", ");
  clauses.push(`${column} IN (${placeholders})`);
  args.push(...values);
}
