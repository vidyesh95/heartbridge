import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Mail, Phone} from "lucide-react";

const faqsValues = [
    {
        id: "item1",
        question: "How do I create a profile on HeartBridge?",
        answer: "Creating a profile is simple! Click on 'Register' and fill out the registration form with your basic details. You can then complete your profile by adding photos, personal information, family background, and partner preferences. Our team will verify your profile within 24-48 hours."
    },
    {
        id: "item2",
        question: "Is my personal information secure?",
        answer: "Absolutely! We take privacy and security very seriously. All personal information is encrypted and stored securely. We never share your contact details without your explicit permission. You have full control over who can view your profile and contact you."
    },
    {
        id: "item3",
        question: "How does the matching process work?",
        answer: "Our intelligent matching algorithm considers your preferences, background, education,location, and other compatibility factors. You can browse profiles that match your criteria, and our matchmakers also provide personalized recommendations based on your preferences."
    },
    {
        id: "item4",
        question: "What is the verification process?",
        answer: "We verify all profiles through multiple steps including phone verification, document verification (ID proof, education certificates), and photo verification. This ensures that all members are genuine and serious about finding a life partner."
    },
    {
        id: "item5",
        question: "How much does it cost to use HeartBridge?",
        answer: "We offer various membership plans to suit different needs. Basic registration is free, which allows you to create a profile and browse matches. Premium memberships unlock additional features like unlimited messaging, priority customer support, and enhanced privacy controls."
    },
    {
        id: "item6",
        question: "Can I contact matches directly?",
        answer: "Yes, premium members can send direct messages to their matches. Free members can express interest, and if the interest is mutual, they can connect. We also facilitate introductions through our matchmaking team when both families are interested."
    },
    {
        id: "item7",
        question: "What if I don't find suitable matches?",
        answer: "Our dedicated matchmaking team works personally with members who need additional assistance. We also regularly add new profiles, so we recommend staying active and updating your preferences as needed. Our customer support team is always available to help optimize your search."
    },
    {
        id: "item8",
        question: "How do I report inappropriate behavior or profiles?",
        answer: "We have zero tolerance for inappropriate behavior. You can report any suspicious profiles or misconduct using the 'Report' button on profiles or by contacting our customer support team directly. We investigate all reports promptly and take appropriate action."
    },
    {
        id: "item9",
        question: "Can I pause or delete my profile?",
        answer: "Yes, you can pause your profile at any time if you want to take a break. You can also permanently delete your profile if you no longer wish to use our services. All your data will be removed from our system as per our privacy policy."
    },
    {
        id: "item10",
        question: "Do you provide assistance with the first meeting?",
        answer: "Absolutely! Our experienced team helps coordinate first meetings between families. We provide guidance on the process and can even facilitate the initial introduction call between families if both parties agree."
    }
]
export default function FrequentlyAskedQuestionsSection() {
    return (
        <section className={"flex flex-col items-center justify-center gap-16 px-4 md:px-0 py-32 bg-secondary"}>
            <div className={"space-y-4 md:space-y-8 text-center"}>
                <h3 className={"text-4xl md:text-6xl text-secondary-foreground"}>Frequently Asked Questions</h3>
                <p className={"max-w-xl text-muted-foreground"}>
                    Find answers to common questions about HeartBridge
                </p>
            </div>
            <div className={"w-full max-w-5xl"}>
                <Accordion type={"multiple"} defaultValue={faqsValues.map(faqItem => faqItem.id)}>
                    {faqsValues.map((faqItem) =>(
                    <AccordionItem key={faqItem.id} value={faqItem.id}>
                        <AccordionTrigger>{faqItem.question}</AccordionTrigger>
                        <AccordionContent>{faqItem.answer}</AccordionContent>
                    </AccordionItem>
                    ))}
                </Accordion>
            </div>
            <div className={"flex flex-col items-center justify-center gap-4 w-full max-w-5xl bg-card rounded-xl p-4 md:p-8"}>
                <h5 className={"text-2xl md:text-3xl text-card-foreground"}>Still have questions?</h5>
                <p className={"text-muted-foreground text-center"}>
                    Our customer support team is here to help you with any additional questions or concerns.
                </p>
                <div className={"w-full md:w-auto flex flex-col md:flex-row gap-4 mt-4"}>
                    <Button variant={"outline"} asChild>
                        <Link href={"tel:+919876543210"}>Call Us <Phone/>: +91 98765 43210</Link>
                    </Button>
                    <Button variant={"default"} asChild>
                        <Link href={"/"}>Contact Support <Mail/></Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}