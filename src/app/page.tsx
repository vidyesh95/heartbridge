import HeroSection from "@/components/home/hero-section";
import StatisticsSection from "@/components/home/statistics-section";
import HowItWorksSection from "@/components/home/how-it-works-section";
import SuccessStoriesSection from "@/components/home/success-stories-section";
import FooterSection from "@/components/home/footer-section";
import FrequentlyAskedQuestionsSection from "@/components/home/frequently-asked-questions-section";

export default function Home() {
    return (
        <>
            <main>
                <HeroSection/>
                <StatisticsSection/>
                <HowItWorksSection/>
                <SuccessStoriesSection/>
                <FrequentlyAskedQuestionsSection/>
            </main>
            <FooterSection/>
        </>
    )
}
