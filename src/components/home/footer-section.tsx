import Link from "next/link";

export default function FooterSection() {
  return (
    <footer className={"flex flex-col items-center justify-center bg-primary"}>
      <div className={"w-full max-w-5xl px-4 py-16 md:px-0"}>
        <div className={"grid grid-cols-1 gap-4 py-4 md:grid-cols-[2fr_1fr_1fr] md:gap-8 md:py-8"}>
          <div>
            <h1 className={"mb-2 text-2xl font-semibold text-primary-foreground"}>HeartBridge ♡</h1>
            <p className={"text-primary-foreground"}>
              A free matrimonial site for India, China, the United States, and Germany. Browse,
              like, and message after a mutual like.
            </p>
            <p className={"mt-2 text-lg text-primary-foreground"}>
              WhatsApp 💬&nbsp;&nbsp;<span className={"font-semibold"}>+91 98765 43210</span>
            </p>
          </div>
          <div>
            <h6 className={"mb-2 text-lg font-semibold text-primary-foreground"}>About</h6>
            <Link href={"/about"}>
              <p className={"text-primary-foreground"}>Our story</p>
            </Link>
            <Link href={"/#how-it-works"}>
              <p className={"text-primary-foreground"}>How it works</p>
            </Link>
            <Link href={"/#success-stories"}>
              <p className={"text-primary-foreground"}>Success stories</p>
            </Link>
            <Link href={"/#success-stories"}>
              <p className={"text-primary-foreground"}>Testimonials</p>
            </Link>
          </div>
          <div>
            <h6 className={"mb-2 text-lg font-semibold text-primary-foreground"}>Help & Support</h6>
            <Link href={"/#frequently-asked-questions"}>
              <p className={"text-primary-foreground"}>Frequently asked questions</p>
            </Link>
            <Link href={"/contact"}>
              <p className={"text-primary-foreground"}>Contact us</p>
            </Link>
            <Link href={"/privacy-policy"}>
              <p className={"text-primary-foreground"}>Privacy policy</p>
            </Link>
            <Link href={"/terms-of-service"}>
              <p className={"text-primary-foreground"}>Terms of service</p>
            </Link>
          </div>
        </div>
        <hr />
        <div className={"flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between"}>
          <p className={"text-primary-foreground"}>
            Copyright Ⓒ 2025 HeartBridge. All rights reserved.
          </p>
          <p className={"text-primary-foreground"}>India · China · United States · Germany</p>
        </div>
      </div>
    </footer>
  );
}
