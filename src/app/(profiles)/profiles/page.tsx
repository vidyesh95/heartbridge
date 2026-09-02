import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { ProfileSummaryCard } from "@/components/profile/profile-summary-card";
import { catalogForCountry } from "@/domain/countries/catalog-for-country";
import { parseBrowseSearchParams, type BrowseSearchParams } from "@/domain/profile/parse-browse-search-params";
import { findProfilesThatMatchSearchFilters } from "@/db/queries/find-profiles-that-match-search-filters";
import { requireCompletedMatrimonialProfile } from "@/lib/require-completed-matrimonial-profile";

export default async function Profiles({
  searchParams,
}: {
  searchParams: Promise<BrowseSearchParams>;
}) {
  const { session, profile } = await requireCompletedMatrimonialProfile();
  const filters = parseBrowseSearchParams(await searchParams);
  const matches = await findProfilesThatMatchSearchFilters({
    viewerUserId: session.user.id,
    viewerGender: profile.gender,
    viewerSeekingGender: profile.seekingGender,
    filters,
  });
  const viewerCatalog = catalogForCountry(profile.country);

  return (
    <section>
      <hgroup className="flex flex-col items-center justify-center space-y-4 pt-18 text-center">
        <h3 className="text-4xl text-secondary-foreground md:text-6xl">Browse profiles</h3>
        <p className="w-full max-w-2xl text-muted-foreground">
          {matches.length} {matches.length === 1 ? "profile matches" : "profiles match"} your filters
        </p>
      </hgroup>
      <SidebarProvider className="p-4">
        <AppSidebar viewerCatalog={viewerCatalog} initialFilters={filters} />
        <main className="flex-1">
          <SidebarTrigger />
          {matches.length === 0 ? (
            <p className="mt-8 text-center text-muted-foreground">
              No profiles match these filters. Reset them or widen the age and income ranges.
            </p>
          ) : (
            <div className="mt-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {matches.map((match) => (
                <ProfileSummaryCard
                  key={match.userId}
                  profile={match}
                  viewerHasLiked={match.viewerHasLiked}
                  viewerHasBookmarked={match.viewerHasBookmarked}
                />
              ))}
            </div>
          )}
        </main>
      </SidebarProvider>
    </section>
  );
}
