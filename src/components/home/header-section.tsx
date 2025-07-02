import React from "react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function HeaderSection() {
    return (
        <header className={"sticky top-0 z-50 w-full h-14 flex flex-col items-center justify-center backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/20 dark:border-white/20"}>
            <nav className={"w-full max-w-5xl px-4 md:px-0 flex flex-row items-center justify-between gap-4 md:gap-8"}>
                <Link href={"/"} className={"font-semibold text-2xl"}>♡ HeartBridge</Link>
                <Button asChild>
                    <Link href={"/"}>Get Started</Link>
                </Button>
            </nav>
        </header>
    )
}