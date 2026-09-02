import type { ReactNode } from "react";
import HeaderWithActivityCounts from "@/components/dashboard/header-with-activity-counts";
import { requireCompletedMatrimonialProfile } from "@/lib/require-completed-matrimonial-profile";

export default async function MembersLayout({ children }: { children: ReactNode }) {
  await requireCompletedMatrimonialProfile();

  return (
    <div className="relative min-h-screen">
      {children}
      <HeaderWithActivityCounts />
    </div>
  );
}
