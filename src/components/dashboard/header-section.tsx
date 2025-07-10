'use client'

import React, {useState} from "react";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Bookmark, Heart} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useQuery} from "@tanstack/react-query";

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
                credentials: "include",  // send session cookie
            });
            if (!res.ok) return null;   // 401/403 = unauthenticated
            return res.json();
        },
        staleTime: 60_000, // 1 min
    });

    return (
        <header
            className={"fixed top-0 left-0 z-50 w-full h-14 flex flex-col items-center justify-center backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/20 dark:border-white/20"}>
            <nav className={"w-full px-4 flex flex-row items-center justify-between gap-4"}>
                <Link href={"/"} className={"font-semibold text-2xl"}>♡ HeartBridge</Link>
                <div className={"flex flex-row items-center gap-2 md:gap-4"}>
                    <Button
                        variant={"outline"}
                        className={"relative w-10 h-10 rounded-full cursor-pointer text-primary"}
                        asChild
                    >
                        <Link href={"/profiles/bookmarked"}>
                            <Bookmark size={24}/>
                            {bookmarksCount > 0 && (
                                <span
                                    className="absolute -top-1 -right-1 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-blue-500 text-[10px] leading-none text-white"
                                >
                                {bookmarksCount}
                            </span>
                            )}
                        </Link>
                    </Button>
                    <Button
                        variant={"outline"}
                        className={"relative w-10 h-10 rounded-full text-primary cursor-pointer"}
                        asChild
                    >
                        <Link href={"/profiles/liked"}>
                            <Heart size={24}/>
                            {likesCount > 0 && (
                                <span
                                    className="absolute -top-1 -right-1 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-[10px] leading-none text-white"
                                >
                                {likesCount}
                            </span>
                            )}
                        </Link>
                    </Button>
                    {
                        user ? (
                            <Avatar className={"w-10 h-10"}>
                                <AvatarImage src={user.image ?? "https://github.com/shadcn.png"}/>
                                <AvatarFallback>
                                    {(user.name ?? "U").slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        ) : (
                            <Button className={"h-10 rounded-full cursor-pointer"} asChild>
                                <Link href={"/sign-in"}>Sign in</Link>
                            </Button>
                        )
                    }
                </div>
            </nav>
        </header>
    )
}