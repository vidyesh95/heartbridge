import React from "react";
import HeaderWithActivityCounts from "@/components/dashboard/header-with-activity-counts";

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Props) {
  return (
    <div className="relative min-h-screen">
      {children}
      <HeaderWithActivityCounts />
    </div>
  );
}
