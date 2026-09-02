import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <section
      id={"frequently-asked-questions"}
      className={"flex flex-col items-center justify-center gap-16 bg-secondary px-4 py-32 md:px-0"}
    >
      <hgroup className={"space-y-4 text-center md:space-y-8"}>
        <h3 className={"text-4xl text-secondary-foreground md:text-6xl"}>About HeartBridge</h3>
        <p className={"max-w-xl text-muted-foreground"}>
          A free matrimonial site for India, China, the United States, and Germany
        </p>
      </hgroup>
      <Card className={"w-full max-w-5xl"}>
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            HeartBridge helps people who want marriage find each other. You sign in with Google,
            create a profile that matches how your country talks about height, money, and family,
            then browse, like, and message after a mutual like.
          </p>
        </CardContent>
      </Card>
      <Card className={"w-full max-w-5xl"}>
        <CardHeader>
          <CardTitle>Our Values</CardTitle>
        </CardHeader>
        <CardContent className={"grid grid-cols-1 gap-4 md:grid-cols-2"}>
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
              You can hide income, restrict photos, block or report members, and delete your account.
              Admins can add a verification badge; we do not run background checks yet.
            </p>
          </div>
          <div>
            <h5>Direct contact</h5>
            <p>
              After a mutual like you talk in Inbox. There is no paid matchmaker and no subscription.
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
          <li>Country-aware profiles for India, China, the United States, and Germany</li>
          <li>Working browse filters, likes, bookmarks, and mutual-like messaging</li>
          <li>Pause, export, and delete your data from Settings</li>
          <li>Report and block tools, plus an admin inbox for reports</li>
          <li>Free to use — no premium plan</li>
        </CardContent>
      </Card>
    </section>
  );
}
