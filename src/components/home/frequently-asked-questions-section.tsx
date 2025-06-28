import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

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
                <Accordion type={"multiple"}>
                    <AccordionItem value={"item-1"}>
                        <AccordionTrigger>How do I create a profile on HeartBridge?</AccordionTrigger>
                        <AccordionContent>
                            Simple! Click on &lsquo;Register&rsquo; and fill out the registration form with your basic
                            details. You can then complete your profile by adding photos, personal information, family
                            background, and partner preferences. Our team will verify your profile within 24-48 hours.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value={"item-2"}>
                        <AccordionTrigger>Is my personal information secure?</AccordionTrigger>
                        <AccordionContent>
                            Absolutely! We take privacy and security very seriously. All personal information is encrypted and stored securely. We never share your contact details without your explicit permission. You have full control over who can view your profile and contact you.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value={"item-3"}>
                        <AccordionTrigger>How does the matching process work?</AccordionTrigger>
                        <AccordionContent>
                            Our intelligent matching algorithm considers your preferences, background, education, location, and other compatibility factors. You can browse profiles that match your criteria, and our matchmakers also provide personalized recommendations based on your preferences.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value={"item-4"}>
                        <AccordionTrigger>What is the verification process?</AccordionTrigger>
                        <AccordionContent>
                            We verify all profiles through multiple steps including phone verification, document verification (ID proof, education certificates), and photo verification. This ensures that all members are genuine and serious about finding a life partner.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value={"item-5"}>
                        <AccordionTrigger>How much does it cost to use HeartBridge?</AccordionTrigger>
                        <AccordionContent>
                            We offer various membership plans to suit different needs. Basic registration is free, which allows you to create a profile and browse matches. Premium memberships unlock additional features like unlimited messaging, priority customer support, and enhanced privacy controls.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value={"item-6"}>
                        <AccordionTrigger>Can I contact matches directly?</AccordionTrigger>
                        <AccordionContent>
                            Yes, premium members can send direct messages to their matches. Free members can express interest, and if the interest is mutual, they can connect. We also facilitate introductions through our matchmaking team when both families are interested.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value={"item-7"}>
                        <AccordionTrigger>What if I don&apos;t find suitable matches?</AccordionTrigger>
                        <AccordionContent>
                            Our dedicated matchmaking team works personally with members who need additional assistance. We also regularly add new profiles, so we recommend staying active and updating your preferences as needed. Our customer support team is always available to help optimize your search.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value={"item-8"}>
                        <AccordionTrigger>How do I report inappropriate behavior or profiles?</AccordionTrigger>
                        <AccordionContent>
                            We have zero tolerance for inappropriate behavior. You can report any suspicious profiles or misconduct using the &lsquo;Report&rsquo; button on profiles or by contacting our customer support team directly. We investigate all reports promptly and take appropriate action.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value={"item-9"}>
                        <AccordionTrigger>Can I pause or delete my profile?</AccordionTrigger>
                        <AccordionContent>
                            Yes, you can pause your profile at any time if you want to take a break. You can also permanently delete your profile if you no longer wish to use our services. All your data will be removed from our system as per our privacy policy.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value={"item-10"}>
                        <AccordionTrigger>Do you provide assistance with the first meeting?</AccordionTrigger>
                        <AccordionContent>
                            Absolutely! Our experienced team helps coordinate first meetings between families. We provide guidance on the process and can even facilitate the initial introduction call between families if both parties agree.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    )
}