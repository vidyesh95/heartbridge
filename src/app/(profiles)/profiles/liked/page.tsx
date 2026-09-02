import { ProfileSummaryCard } from "@/components/profile/profile-summary-card";
import { findLikedProfilesForUser } from "@/db/queries/find-liked-and-bookmarked-profiles";
import { requireCompletedMatrimonialProfile } from "@/lib/require-completed-matrimonial-profile";

export default async function Liked() {
  const { session } = await requireCompletedMatrimonialProfile();
  const profiles = await findLikedProfilesForUser(session.user.id);

  return (
    <section className="px-4 pb-16">
      <hgroup className="flex flex-col items-center justify-center space-y-4 pt-18 text-center">
        <h3 className="text-4xl text-secondary-foreground md:text-6xl">Liked profiles</h3>
        <p className="w-full max-w-2xl text-muted-foreground">
          {profiles.length === 0
            ? "You have not liked anyone yet."
            : `${profiles.length} ${profiles.length === 1 ? "person" : "people"} you liked`}
        </p>
      </hgroup>
      <div className="mx-auto mt-8 grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profiles.map((profile) => (
          <ProfileSummaryCard key={profile.userId} profile={profile} viewerHasLiked />
        ))}
      </div>
    </section>
  );
}
