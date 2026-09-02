import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart, MessageCircle, UserPlus } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="flex flex-col items-center justify-center gap-16 bg-secondary px-4 py-32 md:px-0"
    >
      <hgroup className="space-y-4 text-center md:space-y-8">
        <h3 className="text-4xl text-secondary-foreground md:text-6xl">How It Works</h3>
        <p className="max-w-xl text-muted-foreground">
          Three steps. No paid membership. No matchmaker in the middle.
        </p>
      </hgroup>
      <div className="grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex flex-col items-center justify-center gap-2 md:gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border bg-primary-foreground text-primary hover:border-primary">
            <UserPlus />
          </div>
          <p className="text-center text-muted-foreground">STEP 1</p>
          <h4 className="text-center text-2xl text-primary md:text-3xl">Sign in and tell us where you live</h4>
          <p className="text-center text-muted-foreground">
            Google sign-in, then a country-aware profile: India, China, the United States, or Germany.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 md:gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border bg-primary-foreground text-primary hover:border-primary">
            <Heart />
          </div>
          <p className="text-center text-muted-foreground">STEP 2</p>
          <h4 className="text-center text-2xl text-primary md:text-3xl">Browse and like</h4>
          <p className="text-center text-muted-foreground">
            Filter by country, age, religion, education, and more. Like or bookmark people you want to meet.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 md:gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border bg-primary-foreground text-primary hover:border-primary">
            <MessageCircle />
          </div>
          <p className="text-center text-muted-foreground">STEP 3</p>
          <h4 className="text-center text-2xl text-primary md:text-3xl">Message after a mutual like</h4>
          <p className="text-center text-muted-foreground">
            When both people like each other, Inbox opens so you can talk and arrange a meeting yourselves.
          </p>
        </div>
      </div>
      <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-4 rounded-xl bg-primary p-4 md:p-8">
        <h3 className="text-3xl text-primary-foreground md:text-4xl">Ready to begin?</h3>
        <p className="max-w-xl text-center text-primary-foreground/80">
          Create a free profile and start browsing members in four countries.
        </p>
        <Button className="w-full md:w-auto" variant="outline" asChild>
          <Link href="/sign-in">Start with Google</Link>
        </Button>
      </div>
    </section>
  );
}
