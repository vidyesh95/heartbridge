import Link from "next/link";
import { AccountSettingsControls } from "@/components/settings/account-settings-controls";
import { catalogForCountry } from "@/domain/countries/catalog-for-country";
import { requireCompletedMatrimonialProfile } from "@/lib/require-completed-matrimonial-profile";

export default async function SettingsPage() {
  const { profile } = await requireCompletedMatrimonialProfile();
  const catalog = catalogForCountry(profile.country);

  return (
    <section className="mx-auto w-full max-w-2xl space-y-8 px-4 pt-24 pb-16">
      <h1 className="text-4xl text-secondary-foreground">Settings</h1>
      <p className="text-muted-foreground">
        You are browsing as a member in {catalog.englishName}. Photo, income visibility, and partner
        preferences are edited on <Link href="/me" className="underline">My profile</Link>.
      </p>
      {profile.isPaused ? (
        <p className="rounded-xl bg-muted p-4">Your profile is paused and hidden from browse.</p>
      ) : null}
      <AccountSettingsControls isPaused={profile.isPaused} />
      {catalog.extraFields.requirePrivacyConsent ? (
        <p className="text-sm text-muted-foreground">
          German members can export or delete their data at any time. Consent was recorded{" "}
          {profile.privacyConsentAt
            ? new Date(profile.privacyConsentAt).toLocaleDateString()
            : "during onboarding"}
          .
        </p>
      ) : null}
    </section>
  );
}
