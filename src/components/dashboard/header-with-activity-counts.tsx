import { countLikesBookmarksAndUnreadMessages } from "@/db/queries/find-liked-and-bookmarked-profiles";
import { getServerSession } from "@/lib/session";
import HeaderSection from "@/components/dashboard/header-section";

export default async function HeaderWithActivityCounts() {
  const session = await getServerSession();
  const counts = session
    ? await countLikesBookmarksAndUnreadMessages(session.user.id)
    : { likes: 0, bookmarks: 0, unread: 0 };

  return (
    <HeaderSection likesCount={counts.likes} bookmarksCount={counts.bookmarks} unreadCount={counts.unread} />
  );
}
