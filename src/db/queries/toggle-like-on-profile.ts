import { createRandomId, getTursoClient, nowAsIsoTimestamp } from "@/db/turso-client";

export type ToggleLikeResult = {
  liked: boolean;
  isMutualMatch: boolean;
  conversationId: string | null;
};

function sortedConversationMemberIds(userA: string, userB: string) {
  return userA < userB ? [userA, userB] : [userB, userA];
}

export async function findOrCreateConversationForPair(userA: string, userB: string) {
  const [memberA, memberB] = sortedConversationMemberIds(userA, userB);
  const client = getTursoClient();

  const existing = await client.execute({
    sql: "SELECT id FROM conversation WHERE member_a_id = ? AND member_b_id = ?",
    args: [memberA, memberB],
  });
  if (existing.rows[0]) {
    return String(existing.rows[0].id);
  }

  const conversationId = createRandomId("conversation");
  await client.execute({
    sql: "INSERT INTO conversation (id, member_a_id, member_b_id, created_at) VALUES (?, ?, ?, ?)",
    args: [conversationId, memberA, memberB, nowAsIsoTimestamp()],
  });
  return conversationId;
}

export async function toggleLikeOnProfile(likerUserId: string, likedUserId: string): Promise<ToggleLikeResult> {
  if (likerUserId === likedUserId) {
    throw new Error("You cannot like your own profile.");
  }

  const client = getTursoClient();
  const timestamp = nowAsIsoTimestamp();

  const existing = await client.execute({
    sql: "SELECT 1 FROM profile_like WHERE liker_user_id = ? AND liked_user_id = ?",
    args: [likerUserId, likedUserId],
  });

  if (existing.rows.length > 0) {
    await client.execute({
      sql: "DELETE FROM profile_like WHERE liker_user_id = ? AND liked_user_id = ?",
      args: [likerUserId, likedUserId],
    });
    return { liked: false, isMutualMatch: false, conversationId: null };
  }

  await client.execute({
    sql: "INSERT INTO profile_like (liker_user_id, liked_user_id, created_at) VALUES (?, ?, ?)",
    args: [likerUserId, likedUserId, timestamp],
  });

  const likedProfile = await client.execute({
    sql: "SELECT seed_will_reciprocate_likes FROM matrimonial_profile WHERE user_id = ?",
    args: [likedUserId],
  });
  if (Number(likedProfile.rows[0]?.seed_will_reciprocate_likes) === 1) {
    await client.execute({
      sql: `
        INSERT OR IGNORE INTO profile_like (liker_user_id, liked_user_id, created_at)
        VALUES (?, ?, ?)
      `,
      args: [likedUserId, likerUserId, timestamp],
    });
  }

  const theyLikedBack = await client.execute({
    sql: "SELECT 1 FROM profile_like WHERE liker_user_id = ? AND liked_user_id = ?",
    args: [likedUserId, likerUserId],
  });

  if (theyLikedBack.rows.length === 0) {
    return { liked: true, isMutualMatch: false, conversationId: null };
  }

  const conversationId = await findOrCreateConversationForPair(likerUserId, likedUserId);
  return { liked: true, isMutualMatch: true, conversationId };
}

export async function toggleBookmarkOnProfile(bookmarkerUserId: string, bookmarkedUserId: string) {
  if (bookmarkerUserId === bookmarkedUserId) {
    throw new Error("You cannot bookmark your own profile.");
  }

  const client = getTursoClient();
  const existing = await client.execute({
    sql: "SELECT 1 FROM profile_bookmark WHERE bookmarker_user_id = ? AND bookmarked_user_id = ?",
    args: [bookmarkerUserId, bookmarkedUserId],
  });

  if (existing.rows.length > 0) {
    await client.execute({
      sql: "DELETE FROM profile_bookmark WHERE bookmarker_user_id = ? AND bookmarked_user_id = ?",
      args: [bookmarkerUserId, bookmarkedUserId],
    });
    return { bookmarked: false };
  }

  await client.execute({
    sql: "INSERT INTO profile_bookmark (bookmarker_user_id, bookmarked_user_id, created_at) VALUES (?, ?, ?)",
    args: [bookmarkerUserId, bookmarkedUserId, nowAsIsoTimestamp()],
  });
  return { bookmarked: true };
}
