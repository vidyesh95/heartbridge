"use server";

import { revalidatePath } from "next/cache";
import { blockThisProfile, reportThisProfile } from "@/db/queries/block-and-report-profile";
import { toggleBookmarkOnProfile, toggleLikeOnProfile } from "@/db/queries/toggle-like-on-profile";
import { requireCompletedMatrimonialProfile } from "@/lib/require-completed-matrimonial-profile";

export async function likeThisProfile(likedUserId: string) {
  const { session } = await requireCompletedMatrimonialProfile();
  const result = await toggleLikeOnProfile(session.user.id, likedUserId);
  revalidatePath("/profiles");
  revalidatePath(`/profiles/${likedUserId}`);
  revalidatePath("/profiles/liked");
  revalidatePath("/inbox");
  return result;
}

export async function bookmarkThisProfile(bookmarkedUserId: string) {
  const { session } = await requireCompletedMatrimonialProfile();
  const result = await toggleBookmarkOnProfile(session.user.id, bookmarkedUserId);
  revalidatePath("/profiles");
  revalidatePath(`/profiles/${bookmarkedUserId}`);
  revalidatePath("/profiles/bookmarked");
  return result;
}

export async function blockThisMember(blockedUserId: string) {
  const { session } = await requireCompletedMatrimonialProfile();
  await blockThisProfile(session.user.id, blockedUserId);
  revalidatePath("/profiles");
  revalidatePath(`/profiles/${blockedUserId}`);
  revalidatePath("/inbox");
  return { ok: true as const };
}

export async function reportThisMember(reportedUserId: string, reason: string, details?: string) {
  const { session } = await requireCompletedMatrimonialProfile();
  await reportThisProfile({
    reporterUserId: session.user.id,
    reportedUserId,
    reason,
    details,
  });
  revalidatePath("/admin");
  return { ok: true as const };
}
