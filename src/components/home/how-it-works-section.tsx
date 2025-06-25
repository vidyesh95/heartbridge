import {Button} from "@/components/ui/button";
import Link from "next/link";
import {UserPlus} from "lucide-react";

export default function HowItWorksSection() {
    return (
        <section className={"flex flex-col items-center justify-center gap-4 md:gap-8 px-4 md:px-0 py-16 bg-secondary"}>
            <div className={"space-y-4 md:space-y-8 text-center"}>
                <h3 className={"text-4xl md:text-6xl"}>How It Works</h3>
                <p className={"max-w-xl text-muted-foreground"}>
                    Our simple yet effective process connects family while maintaining traditional values and modern
                    convenience
                </p>
            </div>
            <div>
                <div className={"flex flex-col items-center justify-center gap-2 md:gap-4"}>
                    <div
                        className={"flex justify-center items-center h-16 w-16 bg-primary-foreground rounded-full text-primary border"}
                    >
                        <UserPlus/>
                    </div>
                    <p className={"text-muted-foreground text-center"}>STEP 1</p>
                    <h4 className={"text-2xl md:text-3xl text-primary text-center"}>Register & Verify</h4>
                    <p className={"text-muted-foreground text-center"}>
                        Create your detailed profile and verify your contact details for complete security and
                        authenticity.
                    </p>
                </div>
            </div>
            <div
                className={"w-full max-w-5xl flex flex-col gap-4 items-center justify-center bg-primary rounded-xl p-4 md:p-8"}
            >
                <h3 className={"text-3xl md:text-4xl text-primary-foreground"}>Ready to Begin?</h3>
                <p className={"max-w-xl text-muted-foreground text-center"}>
                    Join thousands who found their soulmate through our trusted matrimonial platform. Your journey to
                    happiness starts here.
                </p>
                <Button className={"w-full md:w-auto"} variant={"outline"} asChild>
                    <Link href={"/"}>Start Your Journey 💘</Link>
                </Button>
            </div>
        </section>
    )
}