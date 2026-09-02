import { countLikesBookmarksAndUnreadMessages } from "@/db/queries/find-liked-and-bookmarked-profiles";
import { findMatrimonialProfileForUser } from "@/db/queries/find-matrimonial-profile-for-user";
import { getServerSession } from "@/lib/session";
import HeaderSection from "@/components/dashboard/header-section";

export default async function HeaderWithActivityCounts() {
  const session = await getServerSession();
  const profile = session ? await findMatrimonialProfileForUser(session.user.id) : null;
  const counts =
    session && profile
      ? await countLikesBookmarksAndUnreadMessages(session.user.id)
      : { likes: 0, bookmarks: 0, unread: 0 };

  return (
    <HeaderSection
      likesCount={counts.likes}
      bookmarksCount={counts.bookmarks}
      unreadCount={counts.unread}
      hasMatrimonialProfile={Boolean(profile)}
    />
  );
}
