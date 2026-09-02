import { mapSqlRowToMatrimonialProfile, mapSqlRowToPartnerPreference } from "@/db/map-sql-row-to-matrimonial-profile";
import { getTursoClient } from "@/db/turso-client";
import type { MatrimonialProfile, PartnerPreference } from "@/db/types";

export async function findMatrimonialProfileForUser(userId: string): Promise<MatrimonialProfile | null> {
  const result = await getTursoClient().execute({
    sql: "SELECT * FROM matrimonial_profile WHERE user_id = ?",
    args: [userId],
  });
  const row = result.rows[0];
  return row ? mapSqlRowToMatrimonialProfile(row) : null;
}

export async function findPartnerPreferenceForUser(userId: string): Promise<PartnerPreference | null> {
  const result = await getTursoClient().execute({
    sql: "SELECT * FROM partner_preference WHERE user_id = ?",
    args: [userId],
  });
  const row = result.rows[0];
  return row ? mapSqlRowToPartnerPreference(row) : null;
}

export async function userHasCompletedMatrimonialProfile(userId: string) {
  const profile = await findMatrimonialProfileForUser(userId);
  return Boolean(profile);
}
