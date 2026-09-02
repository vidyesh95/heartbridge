import React from "react";
import HeaderWithActivityCounts from "@/components/dashboard/header-with-activity-counts";
import { requireCompletedMatrimonialProfile } from "@/lib/require-completed-matrimonial-profile";

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Props) {
  await requireCompletedMatrimonialProfile();

  return (
    <div className="relative min-h-screen">
      {children}
      <HeaderWithActivityCounts />
    </div>
  );
}
