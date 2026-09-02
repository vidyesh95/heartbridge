import { redirect } from "next/navigation";
import { findMatrimonialProfileForUser } from "@/db/queries/find-matrimonial-profile-for-user";
import { getServerSession, requireSession } from "@/lib/session";

/** Inbox, settings, likes, and social actions still need a completed profile. Browse is public. */
export async function requireCompletedMatrimonialProfile() {
  const session = await requireSession();
  const profile = await findMatrimonialProfileForUser(session.user.id);
  if (!profile) {
    redirect("/onboarding");
  }
  return { session, profile };
}

/** Logged-out visitors and signed-in people who have not finished onboarding can still read the catalog. */
export async function getOptionalBrowseViewer() {
  const session = await getServerSession();
  if (!session) {
    return { session: null, profile: null };
  }
  const profile = await findMatrimonialProfileForUser(session.user.id);
  return { session, profile };
}

/** Onboarding should bounce people who already have a profile back to browse. */
export async function requireSessionWithoutMatrimonialProfile() {
  const session = await requireSession();
  const profile = await findMatrimonialProfileForUser(session.user.id);
  if (profile) {
    redirect("/profiles");
  }
  return session;
}
