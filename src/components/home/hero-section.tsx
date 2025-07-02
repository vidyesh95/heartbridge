import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className={"h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center gap-8 md:gap-16 px-4 md:px-0"}>
            <p className={"px-3 py-1 rounded-full bg-muted"}>
                ♡ India&apos;s most trusted matrimonial platform
            </p>
            <hgroup className={"space-y-4 md:space-y-8 text-center"}>
                <h1 className={"text-4xl md:text-6xl"}>
                    Find Your<span className={"block text-primary"}>Perfect Match</span>
                </h1>
                <p className={"max-w-2xl text-muted-foreground"}>
                    Join thousands of successful couples who found their soulmate through our trusted matrimonial
                    platform. Your journey to happiness starts here.
                </p>
            </hgroup>
            <div className={"w-full md:w-auto flex flex-col md:flex-row gap-4"}>
                <Button variant={"outline"} asChild>
                    <Link href={"/"}>Browse Profiles 🔍</Link>
                </Button>
                <Button asChild>
                    <Link href={"/"}>Start Your Journey 💘</Link>
                </Button>
            </div>
        </section>
    )
}