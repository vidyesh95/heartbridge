'use client'

import React, {useState} from "react";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Bookmark, Heart} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function HeaderSection() {
    const [likesCount] = useState(0);
    const [bookmarksCount] = useState(0);
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
                        <Link href={"/dashboard/bookmarked"}>
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
                        <Link href={"/dashboard/liked"}>
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
                    <Avatar className={"w-10 h-10"}>
                        <AvatarImage src="https://github.com/shadcn.png"/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </nav>
        </header>
    )
}