import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeaderSection() {
  return (
    <header
      className={
        "fixed top-0 left-0 z-50 flex h-14 w-full flex-col items-center justify-center border border-white/20 bg-white/20 backdrop-blur-xl dark:border-white/20 dark:bg-black/20"
      }
    >
      <nav
        className={
          "flex w-full max-w-5xl flex-row items-center justify-between gap-4 px-4 md:gap-8 md:px-0"
        }
      >
        <Link href={"/"} className={"text-2xl font-semibold"}>
          ♡ HeartBridge
        </Link>
        <Button asChild>
          <Link href={"/profiles"}>Get Started</Link>
        </Button>
      </nav>
    </header>
  );
}
