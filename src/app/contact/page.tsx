import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

export default function Contact() {
    return (
        <section className={"flex flex-col items-center justify-center gap-16 px-4 md:px-0 py-32 bg-secondary"}>
            <div className={"space-y-4 md:space-y-8 text-center"}>
                <h3 className={"text-4xl md:text-6xl text-secondary-foreground"}>Contact Us</h3>
                <p className={"max-w-xl text-muted-foreground"}>
                    We&apos;re here to help you on your matrimonial journey
                </p>
            </div>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8"}>
                <div></div>
                <Card>
                    <CardHeader>
                        <CardTitle>Send us a message</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                        <Button>Send Message</Button>
                    </CardFooter>
                </Card>
            </div>
        </section>
    )
}