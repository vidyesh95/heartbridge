import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Heart, Phone, UserPlus} from "lucide-react";

export default function HowItWorksSection() {
    return (
        <section className={"flex flex-col items-center justify-center gap-16 px-4 md:px-0 py-32 bg-secondary"}>
            <div className={"space-y-4 md:space-y-8 text-center"}>
                <h3 className={"text-4xl md:text-6xl text-secondary-foreground"}>How It Works</h3>
                <p className={"max-w-xl text-muted-foreground"}>
                    Our simple yet effective process connects family while maintaining traditional values and modern
                    convenience
                </p>
            </div>
            <div className={"w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8"}>
                <div className={"flex flex-col items-center justify-center gap-2 md:gap-4"}>
                    <div
                        className={"flex justify-center items-center h-16 w-16 bg-primary-foreground rounded-full text-primary border hover:border-primary"}
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
                <div className={"flex flex-col items-center justify-center gap-2 md:gap-4"}>
                    <div
                        className={"flex justify-center items-center h-16 w-16 bg-primary-foreground rounded-full text-primary border hover:border-primary"}
                    >
                        <Heart/>
                    </div>
                    <p className={"text-muted-foreground text-center"}>STEP 2</p>
                    <h4 className={"text-2xl md:text-3xl text-primary text-center"}>Browse & Connect</h4>
                    <p className={"text-muted-foreground text-center"}>
                        Explore potential matches using our smart algorithm and express interest in promising profiles.
                    </p>
                </div>
                <div className={"flex flex-col items-center justify-center gap-2 md:gap-4"}>
                    <div
                        className={"flex justify-center items-center h-16 w-16 bg-primary-foreground rounded-full text-primary border hover:border-primary"}
                    >
                        <Phone/>
                    </div>
                    <p className={"text-muted-foreground text-center"}>STEP 3</p>
                    <h4 className={"text-2xl md:text-3xl text-primary text-center"}>Personal Assistance</h4>
                    <p className={"text-muted-foreground text-center"}>
                        Our dedicated matchmakers facilitate introductions and guide both families through the process.
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