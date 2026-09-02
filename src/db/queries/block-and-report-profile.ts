import { createRandomId, getTursoClient, nowAsIsoTimestamp } from "@/db/turso-client";
import type { ProfileReportRow } from "@/db/types";

export async function blockThisProfile(blockerUserId: string, blockedUserId: string) {
  if (blockerUserId === blockedUserId) {
    throw new Error("You cannot block yourself.");
  }

  const client = getTursoClient();
  const timestamp = nowAsIsoTimestamp();

  await client.execute({
    sql: "INSERT OR IGNORE INTO profile_block (blocker_user_id, blocked_user_id, created_at) VALUES (?, ?, ?)",
    args: [blockerUserId, blockedUserId, timestamp],
  });

  await client.execute({
    sql: "DELETE FROM profile_like WHERE (liker_user_id = ? AND liked_user_id = ?) OR (liker_user_id = ? AND liked_user_id = ?)",
    args: [blockerUserId, blockedUserId, blockedUserId, blockerUserId],
  });

  await client.execute({
    sql: "DELETE FROM profile_bookmark WHERE (bookmarker_user_id = ? AND bookmarked_user_id = ?) OR (bookmarker_user_id = ? AND bookmarked_user_id = ?)",
    args: [blockerUserId, blockedUserId, blockedUserId, blockerUserId],
  });
}

export async function reportThisProfile(input: {
  reporterUserId: string;
  reportedUserId: string;
  reason: string;
  details?: string;
}) {
  if (input.reporterUserId === input.reportedUserId) {
    throw new Error("You cannot report yourself.");
  }

  await getTursoClient().execute({
    sql: `
      INSERT INTO profile_report (id, reporter_user_id, reported_user_id, reason, details, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    args: [
      createRandomId("report"),
      input.reporterUserId,
      input.reportedUserId,
      input.reason,
      input.details?.trim() || null,
      nowAsIsoTimestamp(),
    ],
  });
}

export async function listProfileReportsForAdmin(): Promise<ProfileReportRow[]> {
  const result = await getTursoClient().execute({
    sql: `
      SELECT
        report.id,
        report.reporter_user_id,
        COALESCE(reporter.display_name, reporter_user.name, 'Unknown') AS reporter_name,
        report.reported_user_id,
        COALESCE(reported.display_name, reported_user.name, 'Unknown') AS reported_name,
        report.reason,
        report.details,
        report.created_at
      FROM profile_report AS report
      LEFT JOIN matrimonial_profile AS reporter ON reporter.user_id = report.reporter_user_id
      LEFT JOIN matrimonial_profile AS reported ON reported.user_id = report.reported_user_id
      LEFT JOIN "user" AS reporter_user ON reporter_user.id = report.reporter_user_id
      LEFT JOIN "user" AS reported_user ON reported_user.id = report.reported_user_id
      ORDER BY report.created_at DESC
      LIMIT 100
    `,
  });

  return result.rows.map((row) => ({
    id: String(row.id),
    reporterUserId: String(row.reporter_user_id),
    reporterName: String(row.reporter_name),
    reportedUserId: String(row.reported_user_id),
    reportedName: String(row.reported_name),
    reason: String(row.reason),
    details: row.details == null ? null : String(row.details),
    createdAt: String(row.created_at),
  }));
}

export async function markProfileVerified(profileUserId: string, isVerified: boolean) {
  await getTursoClient().execute({
    sql: "UPDATE matrimonial_profile SET is_verified = ?, updated_at = ? WHERE user_id = ?",
    args: [isVerified ? 1 : 0, nowAsIsoTimestamp(), profileUserId],
  });
}
