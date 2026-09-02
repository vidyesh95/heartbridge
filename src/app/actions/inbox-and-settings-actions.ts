"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sendMessageInConversation } from "@/db/queries/conversations-and-messages";
import {
  deleteMyAccountAndData,
  exportMyAccountData,
  pauseOrUnpauseMyProfile,
} from "@/db/queries/pause-export-and-delete-account";
import { markProfileVerified } from "@/db/queries/block-and-report-profile";
import { saveContactMessage } from "@/db/queries/pause-export-and-delete-account";
import { requireCompletedMatrimonialProfile } from "@/lib/require-completed-matrimonial-profile";
import { requireAdmin } from "@/lib/session";

export async function sendMessageToMatch(conversationId: string, body: string) {
  const { session } = await requireCompletedMatrimonialProfile();
  await sendMessageInConversation({
    conversationId,
    senderUserId: session.user.id,
    body,
  });
  revalidatePath("/inbox");
  revalidatePath(`/inbox/${conversationId}`);
  return { ok: true as const };
}

export async function pauseOrResumeMyProfile(isPaused: boolean) {
  const { session } = await requireCompletedMatrimonialProfile();
  await pauseOrUnpauseMyProfile(session.user.id, isPaused);
  revalidatePath("/me");
  revalidatePath("/settings");
  revalidatePath("/profiles");
  return { ok: true as const };
}

export async function downloadMyAccountData() {
  const { session } = await requireCompletedMatrimonialProfile();
  return exportMyAccountData(session.user.id);
}

export async function deleteMyAccountAndAllData() {
  const { session } = await requireCompletedMatrimonialProfile();
  await deleteMyAccountAndData(session.user.id);
  redirect("/sign-in");
}

export async function submitContactForm(input: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  body: string;
}) {
  await saveContactMessage(input);
  return { ok: true as const };
}

export async function adminMarkProfileVerified(profileUserId: string, isVerified: boolean) {
  await requireAdmin();
  await markProfileVerified(profileUserId, isVerified);
  revalidatePath("/admin");
  revalidatePath(`/profiles/${profileUserId}`);
  return { ok: true as const };
}

export async function adminToggleProfileVerifiedFromForm(formData: FormData) {
  const profileUserId = String(formData.get("userId") ?? "");
  const nextVerified = String(formData.get("nextVerified") ?? "") === "1";
  if (!profileUserId) {
    return;
  }
  await adminMarkProfileVerified(profileUserId, nextVerified);
}
