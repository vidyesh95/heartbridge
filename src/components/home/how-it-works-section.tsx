import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart, Phone, UserPlus } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section
      id={"how-it-works"}
      className={"flex flex-col items-center justify-center gap-16 bg-secondary px-4 py-32 md:px-0"}
    >
      <hgroup className={"space-y-4 text-center md:space-y-8"}>
        <h3 className={"text-4xl text-secondary-foreground md:text-6xl"}>How It Works</h3>
        <p className={"max-w-xl text-muted-foreground"}>
          Our simple yet effective process connects family while maintaining traditional values and
          modern convenience
        </p>
      </hgroup>
      <div className={"grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-3"}>
        <div className={"flex flex-col items-center justify-center gap-2 md:gap-4"}>
          <div
            className={
              "flex h-16 w-16 items-center justify-center rounded-full border bg-primary-foreground text-primary hover:border-primary"
            }
          >
            <UserPlus />
          </div>
          <p className={"text-center text-muted-foreground"}>STEP 1</p>
          <h4 className={"text-center text-2xl text-primary md:text-3xl"}>Register & Verify</h4>
          <p className={"text-center text-muted-foreground"}>
            Create your detailed profile and verify your contact details for complete security and
            authenticity.
          </p>
        </div>
        <div className={"flex flex-col items-center justify-center gap-2 md:gap-4"}>
          <div
            className={
              "flex h-16 w-16 items-center justify-center rounded-full border bg-primary-foreground text-primary hover:border-primary"
            }
          >
            <Heart />
          </div>
          <p className={"text-center text-muted-foreground"}>STEP 2</p>
          <h4 className={"text-center text-2xl text-primary md:text-3xl"}>Browse & Connect</h4>
          <p className={"text-center text-muted-foreground"}>
            Explore potential matches using our smart algorithm and express interest in promising
            profiles.
          </p>
        </div>
        <div className={"flex flex-col items-center justify-center gap-2 md:gap-4"}>
          <div
            className={
              "flex h-16 w-16 items-center justify-center rounded-full border bg-primary-foreground text-primary hover:border-primary"
            }
          >
            <Phone />
          </div>
          <p className={"text-center text-muted-foreground"}>STEP 3</p>
          <h4 className={"text-center text-2xl text-primary md:text-3xl"}>Personal Assistance</h4>
          <p className={"text-center text-muted-foreground"}>
            Our dedicated matchmakers facilitate introductions and guide both families through the
            process.
          </p>
        </div>
      </div>
      <div
        className={
          "flex w-full max-w-5xl flex-col items-center justify-center gap-4 rounded-xl bg-primary p-4 md:p-8"
        }
      >
        <h3 className={"text-3xl text-primary-foreground md:text-4xl"}>Ready to Begin?</h3>
        <p className={"max-w-xl text-center text-muted-foreground"}>
          Join thousands who found their soulmate through our trusted matrimonial platform. Your
          journey to happiness starts here.
        </p>
        <Button className={"w-full md:w-auto"} variant={"outline"} asChild>
          <Link href={"/"}>Start Your Journey 💘</Link>
        </Button>
      </div>
    </section>
  );
}
