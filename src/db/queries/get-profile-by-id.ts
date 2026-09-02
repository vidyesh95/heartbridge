import { mapSqlRowToMatrimonialProfile, mapSqlRowToPartnerPreference } from "@/db/map-sql-row-to-matrimonial-profile";
import { getTursoClient } from "@/db/turso-client";
import type { MatrimonialProfile, PartnerPreference } from "@/db/types";

export type ProfileDetailForViewer = {
  profile: MatrimonialProfile;
  preference: PartnerPreference | null;
  viewerHasLiked: boolean;
  viewerHasBookmarked: boolean;
  theyLikedViewer: boolean;
  isMutualMatch: boolean;
  isBlockedByViewer: boolean;
  conversationId: string | null;
};

export async function getProfileByIdForViewer(
  profileUserId: string,
  viewerUserId?: string,
): Promise<ProfileDetailForViewer | null> {
  const client = getTursoClient();

  const profileResult = await client.execute({
    sql: "SELECT * FROM matrimonial_profile WHERE user_id = ?",
    args: [profileUserId],
  });
  const profileRow = profileResult.rows[0];
  if (!profileRow) {
    return null;
  }

  const preferenceResult = await client.execute({
    sql: "SELECT * FROM partner_preference WHERE user_id = ?",
    args: [profileUserId],
  });
  const preferenceRow = preferenceResult.rows[0];
  const profile = mapSqlRowToMatrimonialProfile(profileRow);
  const preference = preferenceRow ? mapSqlRowToPartnerPreference(preferenceRow) : null;

  if (!viewerUserId) {
    return {
      profile,
      preference,
      viewerHasLiked: false,
      viewerHasBookmarked: false,
      theyLikedViewer: false,
      isMutualMatch: false,
      isBlockedByViewer: false,
      conversationId: null,
    };
  }

  const [likeResult, bookmarkResult, theyLikedResult, blockResult, conversationResult] = await Promise.all([
    client.execute({
      sql: "SELECT 1 FROM profile_like WHERE liker_user_id = ? AND liked_user_id = ?",
      args: [viewerUserId, profileUserId],
    }),
    client.execute({
      sql: "SELECT 1 FROM profile_bookmark WHERE bookmarker_user_id = ? AND bookmarked_user_id = ?",
      args: [viewerUserId, profileUserId],
    }),
    client.execute({
      sql: "SELECT 1 FROM profile_like WHERE liker_user_id = ? AND liked_user_id = ?",
      args: [profileUserId, viewerUserId],
    }),
    client.execute({
      sql: "SELECT 1 FROM profile_block WHERE blocker_user_id = ? AND blocked_user_id = ?",
      args: [viewerUserId, profileUserId],
    }),
    client.execute({
      sql: `
        SELECT id FROM conversation
        WHERE (member_a_id = ? AND member_b_id = ?) OR (member_a_id = ? AND member_b_id = ?)
      `,
      args: [viewerUserId, profileUserId, profileUserId, viewerUserId],
    }),
  ]);

  const viewerHasLiked = likeResult.rows.length > 0;
  const theyLikedViewer = theyLikedResult.rows.length > 0;

  return {
    profile,
    preference,
    viewerHasLiked,
    viewerHasBookmarked: bookmarkResult.rows.length > 0,
    theyLikedViewer,
    isMutualMatch: viewerHasLiked && theyLikedViewer,
    isBlockedByViewer: blockResult.rows.length > 0,
    conversationId: conversationResult.rows[0] ? String(conversationResult.rows[0].id) : null,
  };
}
