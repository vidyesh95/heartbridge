import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail } from "lucide-react";

const faqsValues = [
  {
    id: "item1",
    question: "How do I create a profile on HeartBridge?",
    answer:
      "Sign in with Google. We then ask which country you live in (India, China, the United States, or Germany) and walk you through basics, a short bio, partner preferences, and privacy settings. Your photo starts as your Google avatar.",
  },
  {
    id: "item2",
    question: "Is my personal information secure?",
    answer:
      "We store your profile on a private database and never sell it. You choose who can see your photo and whether income is public. German members must accept the privacy policy before a profile is created. Anyone can export or delete their data from Settings.",
  },
  {
    id: "item3",
    question: "How does matching work?",
    answer:
      "Browse filters by country, age, religion, education, city, height, and marital status. We also hide people who are not looking for your gender. Like a profile; if they like you back — or they are a demo member who reciprocates — you can message them.",
  },
  {
    id: "item4",
    question: "Are profiles verified?",
    answer:
      "Demo members are marked verified. For real accounts, an admin can add or remove a verification badge. We do not yet check government IDs or run phone OTP.",
  },
  {
    id: "item5",
    question: "How much does it cost?",
    answer:
      "HeartBridge is free right now. Creating a profile, browsing, liking, bookmarking, and messaging after a mutual like do not require a paid plan.",
  },
  {
    id: "item6",
    question: "Can I contact matches directly?",
    answer:
      "Yes, after both people like each other. Until then you can like or bookmark a profile. There is no paid shortcut and no human matchmaker in the middle.",
  },
  {
    id: "item7",
    question: "What if I do not find suitable matches?",
    answer:
      "Widen the filters, update your partner preferences on My profile, or try another country. New members appear as they sign up. You can also write to us from the contact page.",
  },
  {
    id: "item8",
    question: "How do I report inappropriate behavior?",
    answer:
      "Open a profile and use Report, or Block to hide each other. Admins see reports on the admin page.",
  },
  {
    id: "item9",
    question: "Can I pause or delete my profile?",
    answer:
      "Yes. Settings lets you pause (hidden from browse), export a JSON copy of your data, or permanently delete your account, likes, and messages.",
  },
  {
    id: "item10",
    question: "Do you arrange first meetings?",
    answer:
      "No. After a mutual like you talk in Inbox and arrange anything yourselves. We do not send staff to meetings.",
  },
];

export default function FrequentlyAskedQuestionsSection() {
  return (
    <section
      id="frequently-asked-questions"
      className="flex flex-col items-center justify-center gap-16 bg-secondary px-4 py-32 md:px-0"
    >
      <hgroup className="space-y-4 text-center md:space-y-8">
        <h3 className="text-4xl text-secondary-foreground md:text-6xl">
          Frequently Asked Questions
        </h3>
        <p className="max-w-xl text-muted-foreground">
          What HeartBridge actually does today
        </p>
      </hgroup>
      <div className="w-full max-w-5xl">
        <Accordion type="multiple" defaultValue={faqsValues.map((faqItem) => faqItem.id)}>
          {faqsValues.map((faqItem) => (
            <AccordionItem key={faqItem.id} value={faqItem.id}>
              <AccordionTrigger>{faqItem.question}</AccordionTrigger>
              <AccordionContent>{faqItem.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="flex w-full max-w-5xl flex-col items-center justify-center gap-4 rounded-xl bg-card p-4 md:p-8">
        <h5 className="text-2xl text-card-foreground md:text-3xl">Still have questions?</h5>
        <p className="text-center text-muted-foreground">Write to us from the contact page.</p>
        <Button variant="default" asChild>
          <Link href="/contact">
            Contact support <Mail />
          </Link>
        </Button>
      </div>
    </section>
  );
}
