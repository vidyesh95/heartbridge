import { createRandomId, getTursoClient, nowAsIsoTimestamp } from "@/db/turso-client";
import type { ConversationMessage, ConversationSummary } from "@/db/types";

export async function listConversationsForUser(userId: string): Promise<ConversationSummary[]> {
  const result = await getTursoClient().execute({
    sql: `
      SELECT
        conversation.id,
        CASE
          WHEN conversation.member_a_id = ? THEN conversation.member_b_id
          ELSE conversation.member_a_id
        END AS other_user_id,
        other_profile.display_name AS other_display_name,
        other_profile.photo_path AS other_photo_path,
        latest.body AS last_message_body,
        latest.created_at AS last_message_at,
        (
          SELECT COUNT(*)
          FROM message AS unread
          WHERE unread.conversation_id = conversation.id
            AND unread.sender_user_id != ?
            AND unread.read_at IS NULL
        ) AS unread_count
      FROM conversation
      JOIN matrimonial_profile AS other_profile
        ON other_profile.user_id = CASE
          WHEN conversation.member_a_id = ? THEN conversation.member_b_id
          ELSE conversation.member_a_id
        END
      LEFT JOIN message AS latest
        ON latest.id = (
          SELECT message.id FROM message
          WHERE message.conversation_id = conversation.id
          ORDER BY message.created_at DESC
          LIMIT 1
        )
      WHERE (conversation.member_a_id = ? OR conversation.member_b_id = ?)
        AND other_profile.user_id NOT IN (
          SELECT blocked_user_id FROM profile_block WHERE blocker_user_id = ?
          UNION
          SELECT blocker_user_id FROM profile_block WHERE blocked_user_id = ?
        )
      ORDER BY COALESCE(latest.created_at, conversation.created_at) DESC
    `,
    args: [userId, userId, userId, userId, userId, userId, userId],
  });

  return result.rows.map((row) => ({
    id: String(row.id),
    otherUserId: String(row.other_user_id),
    otherDisplayName: String(row.other_display_name ?? "Member"),
    otherPhotoPath: String(row.other_photo_path ?? ""),
    lastMessageBody: row.last_message_body == null ? null : String(row.last_message_body),
    lastMessageAt: row.last_message_at == null ? null : String(row.last_message_at),
    unreadCount: Number(row.unread_count ?? 0),
  }));
}

export async function getConversationWithMessages(conversationId: string, viewerUserId: string) {
  const client = getTursoClient();
  const conversation = await client.execute({
    sql: "SELECT * FROM conversation WHERE id = ? AND (member_a_id = ? OR member_b_id = ?)",
    args: [conversationId, viewerUserId, viewerUserId],
  });
  const row = conversation.rows[0];
  if (!row) {
    return null;
  }

  await client.execute({
    sql: `
      UPDATE message
      SET read_at = ?
      WHERE conversation_id = ? AND sender_user_id != ? AND read_at IS NULL
    `,
    args: [nowAsIsoTimestamp(), conversationId, viewerUserId],
  });

  const messages = await client.execute({
    sql: "SELECT * FROM message WHERE conversation_id = ? ORDER BY created_at ASC",
    args: [conversationId],
  });

  const otherUserId = String(row.member_a_id) === viewerUserId ? String(row.member_b_id) : String(row.member_a_id);

  return {
    id: String(row.id),
    otherUserId,
    messages: messages.rows.map(
      (messageRow): ConversationMessage => ({
        id: String(messageRow.id),
        conversationId: String(messageRow.conversation_id),
        senderUserId: String(messageRow.sender_user_id),
        body: String(messageRow.body),
        createdAt: String(messageRow.created_at),
        readAt: messageRow.read_at == null ? null : String(messageRow.read_at),
      }),
    ),
  };
}

export async function sendMessageInConversation(input: {
  conversationId: string;
  senderUserId: string;
  body: string;
}) {
  const trimmed = input.body.trim();
  if (!trimmed) {
    throw new Error("Message cannot be empty.");
  }

  const client = getTursoClient();
  const conversation = await client.execute({
    sql: "SELECT * FROM conversation WHERE id = ? AND (member_a_id = ? OR member_b_id = ?)",
    args: [input.conversationId, input.senderUserId, input.senderUserId],
  });
  if (!conversation.rows[0]) {
    throw new Error("You are not part of this conversation.");
  }

  const messageId = createRandomId("message");
  await client.execute({
    sql: "INSERT INTO message (id, conversation_id, sender_user_id, body, created_at, read_at) VALUES (?, ?, ?, ?, ?, NULL)",
    args: [messageId, input.conversationId, input.senderUserId, trimmed, nowAsIsoTimestamp()],
  });
  return messageId;
}
