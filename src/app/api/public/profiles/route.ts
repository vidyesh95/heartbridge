import { NextRequest, NextResponse } from "next/server";
import { findProfilesThatMatchSearchFilters } from "@/db/queries/find-profiles-that-match-search-filters";
import { compactBrowseFilters, parseBrowseSearchParams } from "@/domain/profile/parse-browse-search-params";
import {
  PUBLIC_AVAILABLE_FILTERS,
  PUBLIC_LISTING_LIMIT,
  publicListingFromProfile,
} from "@/domain/profile/public-listing";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (!process.env.TURSO_DATABASE_URL) {
    return NextResponse.json({ error: "Catalog is unavailable." }, { status: 503 });
  }

  const filters = parseBrowseSearchParams(request.nextUrl.searchParams);
  const matches = await findProfilesThatMatchSearchFilters({ filters });
  const origin = request.nextUrl.origin;
  const profiles = matches.slice(0, PUBLIC_LISTING_LIMIT).map((profile) => publicListingFromProfile(profile, origin));

  return NextResponse.json({
    appliedFilters: compactBrowseFilters(filters),
    availableFilters: PUBLIC_AVAILABLE_FILTERS,
    count: profiles.length,
    truncated: matches.length > PUBLIC_LISTING_LIMIT,
    loginRequiredFor: ["like", "bookmark", "chat", "contactDetails", "medicalHistory"],
    profiles,
  });
}
