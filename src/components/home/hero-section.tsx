import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className={"flex h-screen flex-col items-center justify-center gap-8 px-4 md:gap-16 md:px-0"}
    >
      <p className={"rounded-full bg-muted px-3 py-1"}>
        ♡ Matrimonial matches in India, China, the United States, and Germany
      </p>
      <hgroup className={"space-y-4 text-center md:space-y-8"}>
        <h1 className={"text-4xl md:text-6xl"}>
          Find Your<span className={"block text-primary"}>Perfect Match</span>
        </h1>
        <p className={"max-w-2xl text-muted-foreground"}>
          Create a country-aware profile, browse real members, like the people you want to meet,
          and message them when the interest is mutual.
        </p>
      </hgroup>
      <div className={"flex w-full flex-col gap-4 md:w-auto md:flex-row"}>
        <Button variant={"outline"} asChild>
          <Link href={"/profiles"}>Browse Profiles 🔍</Link>
        </Button>
        <Button asChild>
          <Link href={"/profiles"}>Start Your Journey 💘</Link>
        </Button>
      </div>
    </section>
  );
}
