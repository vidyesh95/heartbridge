import { isSupportedCountryCode } from "@/domain/countries/supported-countries";
import type { ProfileSearchFilters } from "@/db/types";

export const BROWSE_AGE_RANGE = { min: 18, max: 70 } as const;
export const BROWSE_HEIGHT_RANGE_CM = { min: 140, max: 210 } as const;

export type BrowseParamValue = string | string[] | undefined;

export type BrowseSearchParams = {
  country?: BrowseParamValue;
  gender?: BrowseParamValue;
  ageMin?: BrowseParamValue;
  ageMax?: BrowseParamValue;
  incomeMin?: BrowseParamValue;
  incomeMax?: BrowseParamValue;
  heightMinCm?: BrowseParamValue;
  heightMaxCm?: BrowseParamValue;
  city?: BrowseParamValue;
  region?: BrowseParamValue;
  religions?: BrowseParamValue;
  educationBands?: BrowseParamValue;
  maritalStatuses?: BrowseParamValue;
};

type BrowseSearchInput = URLSearchParams | BrowseSearchParams | Record<string, BrowseParamValue>;

function readValues(source: BrowseSearchInput, key: string): string[] {
  if (source instanceof URLSearchParams) {
    return source.getAll(key);
  }
  const raw = (source as Record<string, BrowseParamValue>)[key];
  if (raw === undefined) {
    return [];
  }
  return Array.isArray(raw) ? raw : [raw];
}

function firstScalar(values: string[]): string | undefined {
  const item = values.find((value) => value.trim() !== "");
  return item?.trim();
}

function optionalNumber(value: string | undefined) {
  if (value === undefined || value === "") {
    return undefined;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function flattenList(values: string[]): string[] | undefined {
  const items = values.flatMap((value) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  );
  return items.length > 0 ? items : undefined;
}

export function browseSearchParamsFromUrl(searchParams: URLSearchParams): BrowseSearchParams {
  return {
    country: searchParams.getAll("country"),
    gender: searchParams.getAll("gender"),
    ageMin: searchParams.getAll("ageMin"),
    ageMax: searchParams.getAll("ageMax"),
    incomeMin: searchParams.getAll("incomeMin"),
    incomeMax: searchParams.getAll("incomeMax"),
    heightMinCm: searchParams.getAll("heightMinCm"),
    heightMaxCm: searchParams.getAll("heightMaxCm"),
    city: searchParams.getAll("city"),
    region: searchParams.getAll("region"),
    religions: searchParams.getAll("religions"),
    educationBands: searchParams.getAll("educationBands"),
    maritalStatuses: searchParams.getAll("maritalStatuses"),
  };
}

export function parseBrowseSearchParams(searchParams: BrowseSearchInput): ProfileSearchFilters {
  const countryRaw = firstScalar(readValues(searchParams, "country"));
  const genderRaw = firstScalar(readValues(searchParams, "gender"))?.toLowerCase();
  const countryCode = countryRaw?.toUpperCase();

  return {
    country:
      countryRaw?.toLowerCase() === "all"
        ? "all"
        : countryCode && isSupportedCountryCode(countryCode)
          ? countryCode
          : undefined,
    gender: genderRaw === "male" || genderRaw === "female" || genderRaw === "all" ? genderRaw : undefined,
    ageMin: optionalNumber(firstScalar(readValues(searchParams, "ageMin"))),
    ageMax: optionalNumber(firstScalar(readValues(searchParams, "ageMax"))),
    incomeMin: optionalNumber(firstScalar(readValues(searchParams, "incomeMin"))),
    incomeMax: optionalNumber(firstScalar(readValues(searchParams, "incomeMax"))),
    heightMinCm: optionalNumber(firstScalar(readValues(searchParams, "heightMinCm"))),
    heightMaxCm: optionalNumber(firstScalar(readValues(searchParams, "heightMaxCm"))),
    city: firstScalar(readValues(searchParams, "city")),
    region: firstScalar(readValues(searchParams, "region")),
    religions: flattenList(readValues(searchParams, "religions")),
    educationBands: flattenList(readValues(searchParams, "educationBands")),
    maritalStatuses: flattenList(readValues(searchParams, "maritalStatuses")),
  };
}

export function compactBrowseFilters(filters: ProfileSearchFilters): ProfileSearchFilters {
  return {
    ...(filters.country ? { country: filters.country } : {}),
    ...(filters.gender ? { gender: filters.gender } : {}),
    ...(filters.ageMin !== undefined ? { ageMin: filters.ageMin } : {}),
    ...(filters.ageMax !== undefined ? { ageMax: filters.ageMax } : {}),
    ...(filters.incomeMin !== undefined ? { incomeMin: filters.incomeMin } : {}),
    ...(filters.incomeMax !== undefined ? { incomeMax: filters.incomeMax } : {}),
    ...(filters.heightMinCm !== undefined ? { heightMinCm: filters.heightMinCm } : {}),
    ...(filters.heightMaxCm !== undefined ? { heightMaxCm: filters.heightMaxCm } : {}),
    ...(filters.city ? { city: filters.city } : {}),
    ...(filters.region ? { region: filters.region } : {}),
    ...(filters.religions?.length ? { religions: filters.religions } : {}),
    ...(filters.educationBands?.length ? { educationBands: filters.educationBands } : {}),
    ...(filters.maritalStatuses?.length ? { maritalStatuses: filters.maritalStatuses } : {}),
  };
}

export function browseFiltersToSearchParams(filters: ProfileSearchFilters) {
  const params = new URLSearchParams();
  const compact = compactBrowseFilters(filters);
  if (compact.country) params.set("country", compact.country);
  if (compact.gender) params.set("gender", compact.gender);
  if (compact.ageMin !== undefined) params.set("ageMin", String(compact.ageMin));
  if (compact.ageMax !== undefined) params.set("ageMax", String(compact.ageMax));
  if (compact.incomeMin !== undefined) params.set("incomeMin", String(compact.incomeMin));
  if (compact.incomeMax !== undefined) params.set("incomeMax", String(compact.incomeMax));
  if (compact.heightMinCm !== undefined) params.set("heightMinCm", String(compact.heightMinCm));
  if (compact.heightMaxCm !== undefined) params.set("heightMaxCm", String(compact.heightMaxCm));
  if (compact.city) params.set("city", compact.city);
  if (compact.region) params.set("region", compact.region);
  if (compact.religions?.length) params.set("religions", compact.religions.join(","));
  if (compact.educationBands?.length) params.set("educationBands", compact.educationBands.join(","));
  if (compact.maritalStatuses?.length) {
    params.set("maritalStatuses", compact.maritalStatuses.join(","));
  }
  return params;
}
