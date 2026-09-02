"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function HeaderSection() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

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
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link href={"/profiles"}>Browse profiles</Link>
          </Button>
          {isPending ? (
            <div className="h-10 w-28 animate-pulse rounded-md bg-muted" />
          ) : user ? (
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.image ?? undefined} alt={user.name} />
              <AvatarFallback>{(user.name ?? "U").slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          ) : (
            <Button asChild>
              <Link href={"/sign-in"}>Get Started</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
