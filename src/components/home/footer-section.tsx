import Link from "next/link";

export default function FooterSection(){
    return (
        <footer className={"bg-primary flex flex-col items-center justify-center"}>
            <div className={"w-full max-w-5xl px-4 md:px-0 py-16"}>
                <div className={"grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-4 md:gap-8 py-4 md:py-8"}>
                    <div>
                        <h1 className={"text-primary-foreground text-2xl font-semibold mb-2"}>HeartBridge ♡</h1>
                        <p className={"text-primary-foreground"}>
                            India&apos;s premier matrimonial platform combining traditional matchmaking with modern
                            technology. Find your perfect life partner with our trusted, family-first approach.
                        </p>
                        <p className={"text-primary-foreground text-lg mt-2"}>
                            WhatsApp 💬&nbsp;&nbsp;<span className={"font-semibold"}>+91 98765 43210</span>
                        </p>
                    </div>
                    <div>
                        <h6 className={"text-primary-foreground text-lg font-semibold mb-2"}>About</h6>
                        <Link href={"/about"}>
                            <p className={"text-primary-foreground"}>Our story</p>
                        </Link>
                        <Link href={"/#how-it-works"}>
                            <p className={"text-primary-foreground"}>How it works</p>
                        </Link>
                        <Link href={"/#success-stories"}>
                            <p className={"text-primary-foreground"}>Success stories</p>
                        </Link>
                        <Link href={"/"}>
                            <p className={"text-primary-foreground"}>Testimonials</p>
                        </Link>
                    </div>
                    <div>
                        <h6 className={"text-primary-foreground text-lg font-semibold mb-2"}>Help & Support</h6>
                        <Link href={"/#frequently-asked-questions"}>
                            <p className={"text-primary-foreground"}>Frequently asked questions</p>
                        </Link>
                        <Link href={"/contact"}>
                            <p className={"text-primary-foreground"}>Contact us</p>
                        </Link>
                        <Link href={"/"}>
                            <p className={"text-primary-foreground"}>Privacy policy</p>
                        </Link>
                        <Link href={"/"}>
                            <p className={"text-primary-foreground"}>Terms of service</p>
                        </Link>
                    </div>
                </div>
                <hr/>
                <div className={"flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4"}>
                    <p className={"text-primary-foreground"}>Copyright Ⓒ 2025 HeartBridge. All rights reserved.</p>
                    <p className={"text-primary-foreground"}>Trusted by thousands of families worldwide.</p>
                </div>
            </div>
        </footer>
    )
}