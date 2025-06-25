import {Card} from "@/components/ui/card";
import Image from "next/image";

export default function SuccessStoriesSection() {
    return (
        <section className={"flex flex-col items-center justify-center gap-16 px-4 md:px-0 py-32"}>
            <div className={"space-y-2 md:space-y-4 text-center"}>
                <h3 className={"text-4xl md:text-6xl"}>
                    Success Stories
                </h3>
                <p className={"max-w-xl text-muted-foreground"}>
                    Real couples who found their perfect match and built beautiful lives together
                </p>
            </div>
            <Card>
                <Image src={"/success_story1.avif"} alt={"success story"} width={1024} height={600} objectFit={"cover"}/>
            </Card>
        </section>
    )
}