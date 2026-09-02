import Link from "next/link";
import { notFound } from "next/navigation";
import { SendMessageForm } from "@/components/inbox/send-message-form";
import { getConversationWithMessages } from "@/db/queries/conversations-and-messages";
import { findMatrimonialProfileForUser } from "@/db/queries/find-matrimonial-profile-for-user";
import { requireCompletedMatrimonialProfile } from "@/lib/require-completed-matrimonial-profile";

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) {
  const { conversationId } = await params;
  const { session } = await requireCompletedMatrimonialProfile();
  const conversation = await getConversationWithMessages(conversationId, session.user.id);
  if (!conversation) {
    notFound();
  }

  const other = await findMatrimonialProfileForUser(conversation.otherUserId);

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 pt-24 pb-16">
      <div>
        <ButtonLink href="/inbox" />
        <h1 className="text-3xl">{other?.displayName ?? "Conversation"}</h1>
        {other ? (
          <Link href={`/profiles/${other.userId}`} className="text-sm text-primary">
            View profile
          </Link>
        ) : null}
      </div>
      <ol className="space-y-3 rounded-xl border p-4">
        {conversation.messages.length === 0 ? (
          <li className="text-muted-foreground">No messages yet. Say hello.</li>
        ) : (
          conversation.messages.map((message) => {
            const mine = message.senderUserId === session.user.id;
            return (
              <li
                key={message.id}
                className={`max-w-[80%] rounded-xl px-3 py-2 ${mine ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                <p>{message.body}</p>
                <p className="mt-1 text-[10px] opacity-70">
                  {new Date(message.createdAt).toLocaleString()}
                </p>
              </li>
            );
          })
        )}
      </ol>
      <SendMessageForm conversationId={conversationId} />
    </section>
  );
}

function ButtonLink({ href }: { href: string }) {
  return (
    <Link href={href} className="text-sm text-muted-foreground hover:text-foreground">
      ← All conversations
    </Link>
  );
}
