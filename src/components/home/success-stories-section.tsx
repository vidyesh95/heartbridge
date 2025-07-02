import {Card, CardContent} from "@/components/ui/card";
import Image from "next/image";
import {Quote} from "lucide-react";

export default function SuccessStoriesSection() {
    return (
        <section id={"success-stories"} className={"flex flex-col items-center justify-center gap-16 px-4 md:px-0 py-32"}>
            <hgroup className={"space-y-2 md:space-y-4 text-center"}>
                <h3 className={"text-4xl md:text-6xl"}>
                    Success Stories
                </h3>
                <p className={"max-w-xl text-muted-foreground"}>
                    Real couples who found their perfect match and built beautiful lives together
                </p>
            </hgroup>
            <Card className={"py-0 overflow-hidden"}>
                <CardContent className={"px-0 grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl"}>
                    <Image priority={false} src={"/success_story1.avif"} alt={"success story"} width={512}
                           height={683} className={"w-128 h-170 object-cover"}/>
                    <div className={"p-4 md:p-16"}>
                        <Quote size={48} className={"text-muted"}/>
                        <h4 className={"text-4xl md:text-2xl"}>
                            HeartBridge helped us find each other through their wonderful matchmaking service.
                            Our families connected beautifully and we are overjoyed.
                        </h4>
                        <div className={"flex justify-end"}>
                            <Quote size={48} className={"text-muted"}/>
                        </div>
                        <p className={"text-muted-foreground mt-2 mb-8"}>
                            We are both busy professionals who had little time for traditional matchmaking. The
                            platform&apos;s personalized approach made all the difference.
                        </p>
                        <hr/>
                        <p className={"text-lg font-semibold text-foreground mt-8"}>
                            Yania & Lobsang
                        </p>
                        <p className={"text-muted-foreground"}>
                            Itanagar
                        </p>
                        <p className={"text-sm text-muted-foreground"}>
                            Married on 15th March 2025
                        </p>
                    </div>
                </CardContent>
            </Card>
            <Card className={"py-0 overflow-hidden"}>
                <CardContent className={"px-0 grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl"}>
                    <div className={"p-4 md:p-16"}>
                        <Quote size={48} className={"text-muted"}/>
                        <h4 className={"text-4xl md:text-2xl"}>
                            The personal touch from their team made all the difference. They understood our preferences and connected us with compatible families perfectly.
                        </h4>
                        <div className={"flex justify-end"}>
                            <Quote size={48} className={"text-muted"}/>
                        </div>
                        <p className={"text-muted-foreground mt-2 mb-8"}>
                            What impressed us most was how they took time to understand our values and family background before making introductions.
                        </p>
                        <hr/>
                        <p className={"text-lg font-semibold text-foreground mt-8"}>
                            Sneha & Vikram
                        </p>
                        <p className={"text-muted-foreground"}>
                            Bangalore
                        </p>
                        <p className={"text-sm text-muted-foreground"}>
                            Married on 6th July 2025
                        </p>
                    </div>
                    <Image priority={false} src={"/success_story2.avif"} alt={"success story"} width={512}
                           height={683} className={"w-128 h-170 object-cover"}/>
                </CardContent>
            </Card>
            <Card className={"py-0 overflow-hidden"}>
                <CardContent className={"px-0 grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl"}>
                    <Image priority={false} src={"/success_story3.avif"} alt={"success story"} width={512}
                           height={683} className={"w-128 h-170 object-cover"}/>
                    <div className={"p-4 md:p-16"}>
                        <Quote size={48} className={"text-muted"}/>
                        <h4 className={"text-4xl md:text-2xl"}>
                            We are grateful for HeartBridge&apos;s approach. The human element in matchmaking helped us build trust from the very beginning.
                        </h4>
                        <div className={"flex justify-end"}>
                            <Quote size={48} className={"text-muted"}/>
                        </div>
                        <p className={"text-muted-foreground mt-2 mb-8"}>
                            Their dedicated matchmaker guided us through every step, from the first introduction to our engagement ceremony.
                        </p>
                        <hr/>
                        <p className={"text-lg font-semibold text-foreground mt-8"}>
                            Maibam & Ningthoujam
                        </p>
                        <p className={"text-muted-foreground"}>
                            Imphal
                        </p>
                        <p className={"text-sm text-muted-foreground"}>
                            Married on 15th March 2025
                        </p>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}