import { ProfileSummaryCard } from "@/components/profile/profile-summary-card";
import { findBookmarkedProfilesForUser } from "@/db/queries/find-liked-and-bookmarked-profiles";
import { requireCompletedMatrimonialProfile } from "@/lib/require-completed-matrimonial-profile";

export default async function Bookmarked() {
  const { session } = await requireCompletedMatrimonialProfile();
  const profiles = await findBookmarkedProfilesForUser(session.user.id);

  return (
    <section className="px-4 pb-16">
      <hgroup className="flex flex-col items-center justify-center space-y-4 pt-18 text-center">
        <h3 className="text-4xl text-secondary-foreground md:text-6xl">Bookmarked profiles</h3>
        <p className="w-full max-w-2xl text-muted-foreground">
          {profiles.length === 0
            ? "Save profiles here while you decide."
            : `${profiles.length} saved ${profiles.length === 1 ? "profile" : "profiles"}`}
        </p>
      </hgroup>
      <div className="mx-auto mt-8 grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profiles.map((profile) => (
          <ProfileSummaryCard key={profile.userId} profile={profile} viewerHasBookmarked />
        ))}
      </div>
    </section>
  );
}
