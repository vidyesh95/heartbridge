import Link from "next/link";
import { listConversationsForUser } from "@/db/queries/conversations-and-messages";
import { requireCompletedMatrimonialProfile } from "@/lib/require-completed-matrimonial-profile";
import { ProfilePhoto } from "@/components/profile/profile-photo";

export default async function InboxPage() {
  const { session } = await requireCompletedMatrimonialProfile();
  const conversations = await listConversationsForUser(session.user.id);

  return (
    <section className="mx-auto w-full max-w-3xl space-y-6 px-4 pt-24 pb-16">
      <h1 className="text-4xl text-secondary-foreground">Inbox</h1>
      <p className="text-muted-foreground">
        Conversations open after a mutual like. Seed members who say they will like you back do that
        automatically so you can try messaging.
      </p>
      {conversations.length === 0 ? (
        <p className="rounded-xl bg-muted p-6">No conversations yet. Like a few profiles first.</p>
      ) : (
        <ul className="space-y-3">
          {conversations.map((conversation) => (
            <li key={conversation.id}>
              <Link
                href={`/inbox/${conversation.id}`}
                className="flex items-center gap-4 rounded-xl border p-3 hover:bg-muted"
              >
                <div className="h-14 w-14 overflow-hidden rounded-full">
                  <ProfilePhoto
                    photoPath={conversation.otherPhotoPath}
                    name={conversation.otherDisplayName}
                    visible
                    className="h-14 w-14"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{conversation.otherDisplayName}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {conversation.lastMessageBody ?? "Say hello"}
                  </p>
                </div>
                {conversation.unreadCount > 0 ? (
                  <span className="rounded-full bg-red-500 px-2 text-xs text-white">
                    {conversation.unreadCount}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
