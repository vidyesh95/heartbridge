"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bookmark, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

export default function HeaderSection() {
  const [likesCount] = useState(0);
  const [bookmarksCount] = useState(0);

  /**
   * In production (Vercel) you’ll set
   * NEXT_PUBLIC_API_URL=https://api.heartbridge.com
   * In dev (when the env var is missing) it falls back to
   * http://localhost:8000, which should be where you run uvicorn
   */
  // Call FastAPI directly (CORS) — base URL comes from env
  const { data: user } = useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
      const res = await fetch(`${apiBase}/auth/me`, {
        credentials: "include", // send session cookie
      });
      if (!res.ok) return null; // 401/403 = unauthenticated
      return res.json();
    },
    staleTime: 60_000, // 1 min
  });

  return (
    <header
      className={
        "fixed top-0 left-0 z-50 flex h-14 w-full flex-col items-center justify-center border border-white/20 bg-white/20 backdrop-blur-xl dark:border-white/20 dark:bg-black/20"
      }
    >
      <nav className={"flex w-full flex-row items-center justify-between gap-4 px-4"}>
        <Link href={"/"} className={"text-2xl font-semibold"}>
          ♡ HeartBridge
        </Link>
        <div className={"flex flex-row items-center gap-2 md:gap-4"}>
          <Button
            variant={"outline"}
            className={"relative h-10 w-10 cursor-pointer rounded-full text-primary"}
            asChild
          >
            <Link href={"/profiles/bookmarked"}>
              <Bookmark size={24} />
              {bookmarksCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-blue-500 px-1 text-[10px] leading-none text-white">
                  {bookmarksCount}
                </span>
              )}
            </Link>
          </Button>
          <Button
            variant={"outline"}
            className={"relative h-10 w-10 cursor-pointer rounded-full text-primary"}
            asChild
          >
            <Link href={"/profiles/liked"}>
              <Heart size={24} />
              {likesCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] leading-none text-white">
                  {likesCount}
                </span>
              )}
            </Link>
          </Button>
          {user ? (
            <Avatar className={"h-10 w-10"}>
              <AvatarImage src={user.image ?? "https://github.com/shadcn.png"} />
              <AvatarFallback>{(user.name ?? "U").slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          ) : (
            <Button className={"h-10 cursor-pointer rounded-full"} asChild>
              <Link href={"/sign-in"}>Sign in</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
