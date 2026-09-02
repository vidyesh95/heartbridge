import { isSupportedCountryCode, type SupportedCountryCode } from "@/domain/countries/supported-countries";
import type { ProfileSearchFilters } from "@/db/types";

export type BrowseSearchParams = {
  country?: string;
  gender?: string;
  ageMin?: string;
  ageMax?: string;
  incomeMin?: string;
  incomeMax?: string;
  heightMinCm?: string;
  heightMaxCm?: string;
  city?: string;
  religions?: string;
  educationBands?: string;
  maritalStatuses?: string;
};

function optionalNumber(value: string | undefined) {
  if (value === undefined || value === "") {
    return undefined;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function commaList(value: string | undefined) {
  if (!value) {
    return undefined;
  }
  const items = value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return items.length > 0 ? items : undefined;
}

export function browseSearchParamsFromUrl(searchParams: URLSearchParams): BrowseSearchParams {
  return {
    country: searchParams.get("country") ?? undefined,
    gender: searchParams.get("gender") ?? undefined,
    ageMin: searchParams.get("ageMin") ?? undefined,
    ageMax: searchParams.get("ageMax") ?? undefined,
    incomeMin: searchParams.get("incomeMin") ?? undefined,
    incomeMax: searchParams.get("incomeMax") ?? undefined,
    heightMinCm: searchParams.get("heightMinCm") ?? undefined,
    heightMaxCm: searchParams.get("heightMaxCm") ?? undefined,
    city: searchParams.get("city") ?? undefined,
    religions: searchParams.get("religions") ?? undefined,
    educationBands: searchParams.get("educationBands") ?? undefined,
    maritalStatuses: searchParams.get("maritalStatuses") ?? undefined,
  };
}

export function parseBrowseSearchParams(searchParams: BrowseSearchParams): ProfileSearchFilters {
  const country = searchParams.country;
  const gender = searchParams.gender;

  return {
    country:
      country === "all"
        ? "all"
        : country && isSupportedCountryCode(country)
          ? (country as SupportedCountryCode)
          : undefined,
    gender: gender === "male" || gender === "female" || gender === "all" ? gender : undefined,
    ageMin: optionalNumber(searchParams.ageMin),
    ageMax: optionalNumber(searchParams.ageMax),
    incomeMin: optionalNumber(searchParams.incomeMin),
    incomeMax: optionalNumber(searchParams.incomeMax),
    heightMinCm: optionalNumber(searchParams.heightMinCm),
    heightMaxCm: optionalNumber(searchParams.heightMaxCm),
    city: searchParams.city?.trim() || undefined,
    religions: commaList(searchParams.religions),
    educationBands: commaList(searchParams.educationBands),
    maritalStatuses: commaList(searchParams.maritalStatuses),
  };
}

export function browseFiltersToSearchParams(filters: ProfileSearchFilters) {
  const params = new URLSearchParams();
  if (filters.country) params.set("country", filters.country);
  if (filters.gender) params.set("gender", filters.gender);
  if (filters.ageMin !== undefined) params.set("ageMin", String(filters.ageMin));
  if (filters.ageMax !== undefined) params.set("ageMax", String(filters.ageMax));
  if (filters.incomeMin !== undefined) params.set("incomeMin", String(filters.incomeMin));
  if (filters.incomeMax !== undefined) params.set("incomeMax", String(filters.incomeMax));
  if (filters.heightMinCm !== undefined) params.set("heightMinCm", String(filters.heightMinCm));
  if (filters.heightMaxCm !== undefined) params.set("heightMaxCm", String(filters.heightMaxCm));
  if (filters.city) params.set("city", filters.city);
  if (filters.religions?.length) params.set("religions", filters.religions.join(","));
  if (filters.educationBands?.length) params.set("educationBands", filters.educationBands.join(","));
  if (filters.maritalStatuses?.length) {
    params.set("maritalStatuses", filters.maritalStatuses.join(","));
  }
  return params;
}
