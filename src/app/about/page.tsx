import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export default function About() {
    return (
        <section id={"frequently-asked-questions"}
                 className={"flex flex-col items-center justify-center gap-16 px-4 md:px-0 py-32 bg-secondary"}>
            <hgroup className={"space-y-4 md:space-y-8 text-center"}>
                <h3 className={"text-4xl md:text-6xl text-secondary-foreground"}>About HeartBridge</h3>
                <p className={"max-w-xl text-muted-foreground"}>
                    Connecting hearts, bridging families since 2025
                </p>
            </hgroup>
            <Card className={"w-full max-w-5xl"}>
                <CardHeader>
                    <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        At HeartBridge Classic, we believe that finding your life partner should be a journey filled
                        with hope, respect, and tradition. Our mission is to create meaningful connections between
                        families while honoring the timeless values that make relationships last.
                    </p>
                </CardContent>
            </Card>
            <Card className={"w-full max-w-5xl"}>
                <CardHeader>
                    <CardTitle>Our Values</CardTitle>
                </CardHeader>
                <CardContent className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
                    <div>
                        <h5>Family First</h5>
                        <p>
                            We understand that marriage is not just between two individuals, but between two
                            families.
                        </p>
                    </div>
                    <div>
                        <h5>Trust & Security</h5>
                        <p>
                            Every profile is verified to ensure a safe and trustworthy environment for all our
                            members.
                        </p>
                    </div>
                    <div>
                        <h5>Personal Touch</h5>
                        <p>
                            Our dedicated matchmakers provide personalized service to help you find your perfect
                            match.
                        </p>
                    </div>
                    <div>
                        <h5>Cultural Heritage</h5>
                        <p>
                            We celebrate and respect diverse cultural traditions while fostering meaningful
                            connections.
                        </p>
                    </div>
                </CardContent>
            </Card>
            <Card className={"w-full max-w-5xl"}>
                <CardHeader>
                    <CardTitle>Why Choose Us?</CardTitle>
                </CardHeader>
                <CardContent>
                    <li>Over 10 years of experience in matrimonial services</li>
                    <li>Thousands of successful matches and happy families</li>
                    <li>Verified profiles with comprehensive background checks</li>
                    <li>Dedicated customer support and matchmaking assistance</li>
                    <li>Modern technology combined with traditional values</li>
                </CardContent>
            </Card>
        </section>
    )
}