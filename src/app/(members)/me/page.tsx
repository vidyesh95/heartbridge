import { findPartnerPreferenceForUser } from "@/db/queries/find-matrimonial-profile-for-user";
import { MatrimonialProfileForm } from "@/components/profile/matrimonial-profile-form";
import { defaultProfileFormValues } from "@/components/profile/default-profile-form-values";
import { requireCompletedMatrimonialProfile } from "@/lib/require-completed-matrimonial-profile";

export default async function MyProfilePage() {
  const { session, profile } = await requireCompletedMatrimonialProfile();
  const preference = await findPartnerPreferenceForUser(session.user.id);

  return (
    <section className="mx-auto w-full max-w-4xl space-y-8 px-4 pt-24 pb-16">
      <hgroup className="space-y-2 text-center">
        <h1 className="text-4xl text-secondary-foreground">Edit my profile</h1>
        <p className="text-muted-foreground">
          Changes show up on browse cards immediately. Your photo stays the one from Google until we
          add uploads.
        </p>
      </hgroup>
      <MatrimonialProfileForm
        defaultValues={defaultProfileFormValues({
          displayName: session.user.name,
          existingProfile: profile,
          existingPreference: preference,
        })}
        submitLabel="Save changes"
      />
    </section>
  );
}
