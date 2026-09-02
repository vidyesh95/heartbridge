import type { ReactNode } from "react";
import HeaderWithActivityCounts from "@/components/dashboard/header-with-activity-counts";
import { requireAdmin } from "@/lib/session";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAdmin();

  return (
    <div className="relative min-h-screen">
      {children}
      <HeaderWithActivityCounts />
    </div>
  );
}
