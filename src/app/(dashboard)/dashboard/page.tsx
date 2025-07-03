import Image from "next/image";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Bookmark, Eye, Heart} from "lucide-react";

export default function Dashboard() {
    return (
        <section>
            <hgroup className={"flex flex-col items-center justify-center space-y-4 text-center pt-18"}>
                <h3 className={"text-4xl md:text-6xl text-secondary-foreground"}>Browse Profiles</h3>
                <p className={"w-full max-w-2xl text-muted-foreground"}>
                    6 profiles match your preferences
                </p>
            </hgroup>
            <Card className={"pt-0"}>
                <CardHeader className={"px-0"}>
                    <Image src={"/profile3.avif"} width={256} height={256} alt={"Display Image"} className={"w-64 h-64 object-cover"}/>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter className={"space-x-4"}>
                    <Button variant={"outline"}><Heart/>Like</Button>
                    <Button variant={"outline"}><Bookmark/></Button>
                    <Button variant={"outline"}><Eye/></Button>
                </CardFooter>
            </Card>
        </section>
    )
}