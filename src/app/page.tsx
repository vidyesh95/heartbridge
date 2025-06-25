import HeroSection from "@/components/home/hero-section";
import StatisticsSection from "@/components/home/statistics-section";
import HowItWorksSection from "@/components/home/how-it-works-section";
import SuccessStoriesSection from "@/components/home/success-stories-section";

export default function Home() {
    return (
        <>
            <main>
                <HeroSection/>
                <StatisticsSection/>
                <HowItWorksSection/>
                <SuccessStoriesSection/>
            </main>
            <footer className={"bg-primary flex flex-col items-center justify-center"}>
                <div className={"w-full max-w-5xl px-4 md:px-0 py-4"}>
                    <div>
                        <h1 className={"text-primary-foreground"}>HeartBridge ♡</h1>
                        <p className={"text-primary-foreground"}>
                            India&apos;s premier matrimonial platform combining traditional matchmaking with modern
                            technology. Find your perfect life partner with our trusted, family-first approach.
                        </p>
                        <p className={"text-primary-foreground"}>
                            WhatsApp 💬<span>+91 98765 43210</span>
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
}
