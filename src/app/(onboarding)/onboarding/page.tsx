import { MatrimonialProfileForm } from "@/components/profile/matrimonial-profile-form";
import { defaultProfileFormValues } from "@/components/profile/default-profile-form-values";
import { requireSessionWithoutMatrimonialProfile } from "@/lib/require-completed-matrimonial-profile";

export default async function OnboardingPage() {
  const session = await requireSessionWithoutMatrimonialProfile();

  return (
    <section className="mx-auto w-full max-w-4xl space-y-8 px-4 pt-24 pb-16">
      <hgroup className="space-y-2 text-center">
        <h1 className="text-4xl text-secondary-foreground">Create your matrimonial profile</h1>
        <p className="text-muted-foreground">
          Tell us where you live first. That decides currency, height units, and which extra questions
          we ask.
        </p>
      </hgroup>
      <MatrimonialProfileForm
        defaultValues={defaultProfileFormValues({ displayName: session.user.name })}
        submitLabel="Create profile and start browsing"
        redirectTo="/profiles"
      />
    </section>
  );
}
