import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <main>
            <section className={"h-screen flex flex-col items-center justify-center gap-8 md:gap-16 px-4 md:px-0"}>
                <p className={"px-3 py-1 rounded-full bg-muted"}>
                    ♡ India&apos;s most trusted matrimonial platform
                </p>
                <div className={"space-y-4 md:space-y-8 text-center"}>
                    <h1 className={"text-4xl md:text-6xl"}>
                        Find Your<span className={"block text-primary"}>Perfect Match</span>
                    </h1>
                    <p className={"max-w-2xl text-muted-foreground"}>
                        Join thousands of successful couples who found their soulmate through our trusted matrimonial
                        platform. Your journey to happiness starts here.
                    </p>
                </div>
                <div className={"w-full md:w-auto flex flex-col md:flex-row gap-4"}>
                    <Button variant={"outline"} asChild>
                        <Link href={"/"}>Browse Profiles 🔍</Link>
                    </Button>
                    <Button asChild>
                        <Link href={"/"}>Start Your Journey 💘</Link>
                    </Button>
                </div>
            </section>
            <section className={"flex flex-col items-center justify-center gap-8 md:gap-16 px-4 md:px-0 py-16 bg-secondary"}>
                <div className={"flex flex-col md:flex-row gap-4 md:gap-16"}>
                    <div>
                        <h4 className={"text-4xl text-primary text-center"}>50K+</h4>
                        <p className={"text-sm text-muted-foreground text-center"}>ACTIVE MEMBERS</p>
                    </div>
                    <div>
                        <h4 className={"text-4xl text-primary text-center"}>10K+</h4>
                        <p className={"text-sm text-muted-foreground text-center"}>SUCCESS STORIES</p>
                    </div>
                    <div>
                        <h4 className={"text-4xl text-primary text-center"}>100%</h4>
                        <p className={"text-sm text-muted-foreground text-center"}>VERIFIED</p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:gap-8">
                    <p className={"md:text-center text-muted-foreground"}>✅ 100% Verified Profiles</p>
                    <p className={"md:text-center text-muted-foreground"}>✅ Privacy Protected</p>
                    <p className={"md:text-center text-muted-foreground"}>✅ Personal Matchmaker</p>
                </div>
            </section>
        </main>
    )
}
