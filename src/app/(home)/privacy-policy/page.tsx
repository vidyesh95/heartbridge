import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <section className="flex flex-col items-center justify-center gap-16 bg-secondary px-4 py-32 md:px-0">
      <hgroup className="space-y-4 text-center md:space-y-8">
        <h3 className="text-4xl text-secondary-foreground md:text-6xl">Privacy Policy</h3>
        <p className="max-w-xl text-muted-foreground">Last updated: September 2026</p>
      </hgroup>
      <Card className="w-full max-w-5xl">
        <CardContent>
          <ol className="list-none space-y-8 p-0 [counter-reset:section-counter]">
            <li className="space-y-4">
              <h4 className="text-2xl font-semibold text-secondary-foreground before:content-[counter(section-counter)'.\00a0'] before:[counter-increment:section-counter]">
                Information We Collect
              </h4>
              <p>We collect information you provide directly to us, including:</p>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                <li>Your Google account name, email, and avatar when you sign in</li>
                <li>Matrimonial profile details (date of birth, city, religion, education, income, bio)</li>
                <li>Partner preferences, likes, bookmarks, blocks, and messages</li>
                <li>Contact form submissions</li>
              </ul>
              <p>We do not collect payment card data. The site is free.</p>
            </li>
            <li className="space-y-4">
              <h4 className="text-2xl font-semibold text-secondary-foreground before:content-[counter(section-counter)'.\00a0'] before:[counter-increment:section-counter]">
                How We Use Your Information
              </h4>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                <li>Show your profile to other members who are allowed to see it</li>
                <li>Apply browse filters and gender-seeking rules</li>
                <li>Deliver likes, bookmarks, and inbox messages</li>
                <li>Let admins review reports and verification badges</li>
                <li>Comply with law</li>
              </ul>
            </li>
            <li className="space-y-4">
              <h4 className="text-2xl font-semibold text-secondary-foreground before:content-[counter(section-counter)'.\00a0'] before:[counter-increment:section-counter]">
                Sharing
              </h4>
              <p>
                Other members see the fields you publish. We do not sell personal information. We
                share data with our database host (Turso) and Google (sign-in only).
              </p>
            </li>
            <li className="space-y-4">
              <h4 className="text-2xl font-semibold text-secondary-foreground before:content-[counter(section-counter)'.\00a0'] before:[counter-increment:section-counter]">
                Your rights (including GDPR for Germany)
              </h4>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                <li>Edit your profile at any time</li>
                <li>Hide income or restrict who can see your photo</li>
                <li>Pause your profile so it leaves browse</li>
                <li>Export a JSON copy of your data from Settings</li>
                <li>Delete your account and related data from Settings</li>
              </ul>
              <p>
                Members in Germany must tick a privacy consent box before we create a profile. That
                timestamp is stored on your profile.
              </p>
            </li>
            <li className="space-y-4">
              <h4 className="text-2xl font-semibold text-secondary-foreground before:content-[counter(section-counter)'.\00a0'] before:[counter-increment:section-counter]">
                Retention
              </h4>
              <p>
                We keep your data while the account exists. If you delete the account, we remove the
                matrimonial profile, likes, messages, and the sign-in user row immediately.
              </p>
            </li>
            <li className="space-y-4">
              <h4 className="text-2xl font-semibold text-secondary-foreground before:content-[counter(section-counter)'.\00a0'] before:[counter-increment:section-counter]">
                Contact
              </h4>
              <p>Questions: use the contact page or email privacy@heartbridge.in.</p>
            </li>
          </ol>
        </CardContent>
      </Card>
    </section>
  );
}
