import { redirect } from "next/navigation";
import { findMatrimonialProfileForUser } from "@/db/queries/find-matrimonial-profile-for-user";
import { requireSession } from "@/lib/session";

/** Signed-in members who have not finished onboarding cannot use browse, inbox, or settings. */
export async function requireCompletedMatrimonialProfile() {
  const session = await requireSession();
  const profile = await findMatrimonialProfileForUser(session.user.id);
  if (!profile) {
    redirect("/onboarding");
  }
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
