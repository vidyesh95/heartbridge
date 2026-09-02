import { mapSqlRowToMatrimonialProfile } from "@/db/map-sql-row-to-matrimonial-profile";
import { getTursoClient } from "@/db/turso-client";
import type { MatrimonialProfile } from "@/db/types";

export async function findLikedProfilesForUser(viewerUserId: string): Promise<MatrimonialProfile[]> {
  const result = await getTursoClient().execute({
    sql: `
      SELECT profile.*
      FROM profile_like AS liked
      JOIN matrimonial_profile AS profile ON profile.user_id = liked.liked_user_id
      WHERE liked.liker_user_id = ?
        AND profile.is_paused = 0
        AND profile.user_id NOT IN (
          SELECT blocked_user_id FROM profile_block WHERE blocker_user_id = ?
          UNION
          SELECT blocker_user_id FROM profile_block WHERE blocked_user_id = ?
        )
      ORDER BY liked.created_at DESC
    `,
    args: [viewerUserId, viewerUserId, viewerUserId],
  });
  return result.rows.map(mapSqlRowToMatrimonialProfile);
}

export async function findBookmarkedProfilesForUser(viewerUserId: string): Promise<MatrimonialProfile[]> {
  const result = await getTursoClient().execute({
    sql: `
      SELECT profile.*
      FROM profile_bookmark AS bookmark
      JOIN matrimonial_profile AS profile ON profile.user_id = bookmark.bookmarked_user_id
      WHERE bookmark.bookmarker_user_id = ?
        AND profile.is_paused = 0
        AND profile.user_id NOT IN (
          SELECT blocked_user_id FROM profile_block WHERE blocker_user_id = ?
          UNION
          SELECT blocker_user_id FROM profile_block WHERE blocked_user_id = ?
        )
      ORDER BY bookmark.created_at DESC
    `,
    args: [viewerUserId, viewerUserId, viewerUserId],
  });
  return result.rows.map(mapSqlRowToMatrimonialProfile);
}

export async function countLikesBookmarksAndUnreadMessages(userId: string) {
  const client = getTursoClient();
  const [likes, bookmarks, unread] = await Promise.all([
    client.execute({
      sql: "SELECT COUNT(*) AS total FROM profile_like WHERE liker_user_id = ?",
      args: [userId],
    }),
    client.execute({
      sql: "SELECT COUNT(*) AS total FROM profile_bookmark WHERE bookmarker_user_id = ?",
      args: [userId],
    }),
    client.execute({
      sql: `
        SELECT COUNT(*) AS total
        FROM message
        JOIN conversation ON conversation.id = message.conversation_id
        WHERE message.sender_user_id != ?
          AND message.read_at IS NULL
          AND (conversation.member_a_id = ? OR conversation.member_b_id = ?)
      `,
      args: [userId, userId, userId],
    }),
  ]);

  return {
    likes: Number(likes.rows[0]?.total ?? 0),
    bookmarks: Number(bookmarks.rows[0]?.total ?? 0),
    unread: Number(unread.rows[0]?.total ?? 0),
  };
}
