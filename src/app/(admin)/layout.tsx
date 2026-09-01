import type { ReactNode } from "react";
import HeaderSection from "@/components/dashboard/header-section";
import { requireAdmin } from "@/lib/session";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAdmin();

  return (
    <div className="relative min-h-screen">
      {children}
      <HeaderSection />
    </div>
  );
}
