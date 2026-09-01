import React from "react";
import HeaderSection from "@/components/dashboard/header-section";
import { requireSession } from "@/lib/session";

interface Props {
  children: React.ReactNode;
}
export default async function Layout({ children }: Props) {
  await requireSession();

  return (
    <div className={"relative min-h-screen"}>
      {children}
      <HeaderSection />
    </div>
  );
}
