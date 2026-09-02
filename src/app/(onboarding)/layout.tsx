import type { ReactNode } from "react";
import HeaderWithActivityCounts from "@/components/dashboard/header-with-activity-counts";
import { requireSessionWithoutMatrimonialProfile } from "@/lib/require-completed-matrimonial-profile";

export default async function OnboardingLayout({ children }: { children: ReactNode }) {
  await requireSessionWithoutMatrimonialProfile();

  return (
    <div className="relative min-h-screen">
      {children}
      <HeaderWithActivityCounts />
    </div>
  );
}
