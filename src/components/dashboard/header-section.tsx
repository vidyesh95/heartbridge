import React from "react";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Bookmark, Heart} from "lucide-react";

export default function HeaderSection() {
    return (
        <header
            className={"fixed top-0 left-0 z-50 w-full h-14 flex flex-col items-center justify-center backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/20 dark:border-white/20"}>
            <nav className={"w-full px-4 flex flex-row items-center justify-between gap-4"}>
                <Link href={"/"} className={"font-semibold text-2xl"}>♡ HeartBridge</Link>
                <div className={"flex flex-row items-center gap-2 md:gap-4"}>
                    <div className={"w-10 h-10 rounded-full border flex justify-center items-center bg-white/20 dark:bg-black/20 cursor-pointer hover:bg-white/30 text-primary"}>
                        <Heart size={24}/>
                    </div>
                    <div className={"w-10 h-10 rounded-full border flex justify-center items-center bg-white/20 dark:bg-black/20 cursor-pointer hover:bg-white/30 text-primary"}>
                        <Bookmark size={24}/>
                    </div>
                    <Avatar className={"w-10 h-10"}>
                        <AvatarImage src="https://github.com/shadcn.png"/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </nav>
        </header>
    )
}