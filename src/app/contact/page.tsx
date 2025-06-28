import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Clock, Mail, MapPin, MessageCircle, Phone} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

export default function Contact() {
    return (
        <section className={"flex flex-col items-center justify-center gap-16 px-4 md:px-0 py-32 bg-secondary"}>
            <div className={"space-y-4 md:space-y-8 text-center"}>
                <h3 className={"text-4xl md:text-6xl text-secondary-foreground"}>Contact Us</h3>
                <p className={"max-w-xl text-muted-foreground"}>
                    We&apos;re here to help you on your matrimonial journey
                </p>
            </div>
            <div className={"w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start"}>
                <div className={"space-y-4 md:space-y-8"}>
                    <h5 className={"text-2xl md:text-3xl text-card-foreground"}>Get in touch</h5>
                    <p className={"text-muted-foreground"}>
                        Our dedicated team is available to assist you with any questions or concerns. Reach out to us
                        through any of the following channels.
                    </p>
                    <Card>
                        <CardContent className={"flex flex-row gap-4"}>
                            <div
                                className={"w-12 h-12 shrink-0 flex items-center justify-center bg-primary rounded-full"}>
                                <Phone size={24} className={"text-primary-foreground"}/>
                            </div>
                            <div>
                                <h5 className={"text-primary font-semibold"}>Phone Support</h5>
                                <p className={"text-muted-foreground"}>Monday - Friday: 9:00 AM - 8:00 PM</p>
                                <p className={"text-muted-foreground"}>Saturday: 10:00 AM - 6:00 PM</p>
                                <p className={"text-muted-foreground"}>Sunday: Closed</p>
                                <p className={"text-primary"}>+91 98765 43210</p>
                                <p className={"text-primary"}>+91 98765 43211</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className={"flex flex-row gap-4"}>
                            <div
                                className={"w-12 h-12 shrink-0 flex items-center justify-center bg-primary rounded-full"}>
                                <MessageCircle size={24} className={"text-primary-foreground"}/>
                            </div>
                            <div>
                                <h5 className={"text-primary font-semibold"}>WhatsApp Support</h5>
                                <p className={"text-muted-foreground"}>Quick responses, 24/7</p>
                                <p className={"text-primary"}>+91 98765 43210</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className={"flex flex-row gap-4"}>
                            <div
                                className={"w-12 h-12 shrink-0 flex items-center justify-center bg-primary rounded-full"}>
                                <Mail size={24} className={"text-primary-foreground"}/>
                            </div>
                            <div>
                                <h5 className={"text-primary font-semibold"}>Email Support</h5>
                                <p className={"text-muted-foreground"}>We will respond within 24 hours</p>
                                <p className={"text-primary"}>support@heartbridgeclassic.com</p>
                                <p className={"text-primary"}>info@heartbridgeclassic.com</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className={"flex flex-row gap-4"}>
                            <div
                                className={"w-12 h-12 shrink-0 flex items-center justify-center bg-primary rounded-full"}>
                                <MapPin size={24} className={"text-primary-foreground"}/>
                            </div>
                            <div>
                                <h5 className={"text-primary font-semibold"}>Visit Our Office</h5>
                                <p className={"text-muted-foreground"}>HeartBridge Classic Matrimonial Services123
                                    Wedding Street, Love Plaza Mumbai, Maharashtra 400001 India</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className={"flex flex-row gap-4"}>
                            <div
                                className={"w-12 h-12 shrink-0 flex items-center justify-center bg-primary rounded-full"}>
                                <Clock size={24} className={"text-primary-foreground"}/>
                            </div>
                            <div>
                                <h5 className={"text-primary font-semibold"}>Business Hours</h5>
                                <p className={"text-muted-foreground"}>Monday - Friday: 9:00 AM - 8:00 PM</p>
                                <p className={"text-muted-foreground"}>Saturday: 10:00 AM - 6:00 PM</p>
                                <p className={"text-muted-foreground"}>Sunday: Closed</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <Card className={"h-auto self-start"}>
                    <CardHeader>
                        <CardTitle>Send us a message</CardTitle>
                    </CardHeader>
                    <CardContent className={"space-y-2 md:space-y-4"}>
                        <div className={"space-y-1 md:space-y-2"}>
                            <Label htmlFor={"first-name"}>Name</Label>
                            <Input type={"text"} id={"first-name"} placeholder={"Your first name"}/>
                        </div>
                        <div className={"space-y-1 md:space-y-2"}>
                            <Label htmlFor={"last-name"}>Last name</Label>
                            <Input type={"text"} id={"last-name"} placeholder={"Your last name"}/>
                        </div>
                        <div className={"space-y-1 md:space-y-2"}>
                            <Label htmlFor={"email"}>Email</Label>
                            <Input type={"email"} id={"email"} placeholder={"your.email@domain.com"}/>
                        </div>
                        <div className={"space-y-1 md:space-y-2"}>
                            <Label htmlFor={"phone"}>Phone</Label>
                            <Input type={"tel"} id={"phone"} placeholder={"+91 98765 43210"}/>
                        </div>
                        <div className={"space-y-1 md:space-y-2"}>
                            <Label htmlFor={"subject"}>Subject</Label>
                            <Input type={"text"} id={"subject"} placeholder={"Your subject"}/>
                        </div>
                        <div className={"space-y-1 md:space-y-2"}>
                            <Label htmlFor={"message"}>Message</Label>
                            <Textarea id={"message"} placeholder={"Type your message here."}/>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Send Message</Button>
                    </CardFooter>
                </Card>
            </div>
        </section>
    )
}