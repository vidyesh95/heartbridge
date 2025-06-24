import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <main>
            <section>
                <p>♡ India's most trusted matrimonial platform</p>
                <h1>Find Your</h1>
                <h1>Perfect Match</h1>
                <p>
                    Join thousands of successful couples who found their soulmate through our trusted matrimonial
                    platform. Your journey to happiness starts here.
                </p>
                <Button asChild>
                    <Link href={"/"}>Start your journey 💘</Link>
                </Button>
                <Button variant={"outline"} asChild>
                    <Link href={"/"}>Browse profiles 🔍</Link>
                </Button>
                <div>
                    <div>
                        <h4>50K+</h4>
                        <p>ACTIVE MEMBERS</p>
                    </div>
                    <div>
                        <h4>10K+</h4>
                        <p>SUCCESS STORIES</p>
                    </div>
                    <div>
                        <h4>100%</h4>
                        <p>VERIFIED</p>
                    </div>
                </div>
                <p>✅ 100% Verified Profiles</p>
                <p>✅ Privacy Protected</p>
                <p>✅ Personal Matchmaker</p>
            </section>
        </main>
    )
}
