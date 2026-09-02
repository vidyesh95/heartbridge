import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import {
  BrowseFiltersSidebarTrigger,
  BrowseFiltersToggleListener,
} from "@/components/profile/browse-filters-button";
import { ProfileSummaryCard } from "@/components/profile/profile-summary-card";
import { catalogForCountry, catalogForCountryOrIndia } from "@/domain/countries/catalog-for-country";
import {
  browseFiltersToSearchParams,
  parseBrowseSearchParams,
  type BrowseSearchParams,
} from "@/domain/profile/parse-browse-search-params";
import { findProfilesThatMatchSearchFilters } from "@/db/queries/find-profiles-that-match-search-filters";
import { getOptionalBrowseViewer } from "@/lib/require-completed-matrimonial-profile";

export default async function Profiles({
  searchParams,
}: {
  searchParams: Promise<BrowseSearchParams>;
}) {
  const { session, profile } = await getOptionalBrowseViewer();
  const filters = parseBrowseSearchParams(await searchParams);
  const viewerCanAct = Boolean(profile);
  const matches = await findProfilesThatMatchSearchFilters({
    viewerUserId: session?.user.id,
    viewerGender: profile?.gender,
    viewerSeekingGender: profile?.seekingGender,
    filters,
  });
  const viewerCatalog = profile ? catalogForCountry(profile.country) : catalogForCountryOrIndia(filters.country);

  return (
    <SidebarProvider className="min-h-screen p-4 pt-18">
      <BrowseFiltersToggleListener />
      <AppSidebar
        key={browseFiltersToSearchParams(filters).toString()}
        viewerCatalog={viewerCatalog}
        initialFilters={filters}
      />
      <main className="flex-1">
        <hgroup className="flex flex-col items-center justify-center space-y-4 text-center">
          <h3 className="text-4xl text-secondary-foreground md:text-6xl">Browse profiles</h3>
          <p className="w-full max-w-2xl text-muted-foreground">
            Use Filters to narrow by country, age, religion, education, height, city, or marital status.{" "}
            {matches.length} {matches.length === 1 ? "profile matches" : "profiles match"} your filters
            {viewerCanAct ? "" : ". Like, bookmark, and chat after you create your own profile."}
          </p>
          <BrowseFiltersSidebarTrigger />
        </hgroup>
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
                viewerCanAct={viewerCanAct}
              />
            ))}
          </div>
        )}
      </main>
    </SidebarProvider>
  );
}
