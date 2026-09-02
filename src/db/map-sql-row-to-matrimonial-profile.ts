import type { Row } from "@libsql/client";
import { fromSqliteBoolean, parseJsonStringArray } from "@/db/turso-client";
import type { EducationBandValue } from "@/domain/countries/shared-profile-options";
import type { SupportedCountryCode, SupportedCurrency } from "@/domain/countries/supported-countries";
import type { MatrimonialProfile, PartnerPreference } from "@/db/types";

function text(row: Row, column: string) {
  const value = row[column];
  return typeof value === "string" ? value : String(value ?? "");
}

function optionalText(row: Row, column: string) {
  const value = row[column];
  if (value === null || value === undefined) {
    return null;
  }
  return String(value);
}

function integer(row: Row, column: string) {
  const value = row[column];
  return typeof value === "number" ? value : Number(value ?? 0);
}

function optionalInteger(row: Row, column: string) {
  const value = row[column];
  if (value === null || value === undefined) {
    return null;
  }
  return typeof value === "number" ? value : Number(value);
}

export function mapSqlRowToMatrimonialProfile(row: Row): MatrimonialProfile {
  const onlyChildFlag = optionalInteger(row, "is_only_child");

  return {
    userId: text(row, "user_id"),
    displayName: text(row, "display_name"),
    country: text(row, "country") as SupportedCountryCode,
    gender: text(row, "gender") as "male" | "female",
    seekingGender: text(row, "seeking_gender") as "male" | "female",
    dateOfBirth: text(row, "date_of_birth"),
    heightCm: integer(row, "height_cm"),
    city: text(row, "city"),
    region: text(row, "region"),
    religion: text(row, "religion"),
    education: text(row, "education"),
    educationBand: text(row, "education_band") as EducationBandValue,
    profession: text(row, "profession"),
    annualIncomeAmount: integer(row, "annual_income_amount"),
    incomeCurrency: text(row, "income_currency") as SupportedCurrency,
    maritalStatus: text(row, "marital_status"),
    diet: text(row, "diet"),
    smoking: text(row, "smoking"),
    drinking: text(row, "drinking"),
    aboutMe: text(row, "about_me"),
    motherTongue: optionalText(row, "mother_tongue"),
    community: optionalText(row, "community"),
    familyType: optionalText(row, "family_type"),
    isOnlyChild: onlyChildFlag === null ? null : fromSqliteBoolean(onlyChildFlag),
    hasChildren: text(row, "has_children"),
    wantsChildren: text(row, "wants_children"),
    languagesSpoken: parseJsonStringArray(optionalText(row, "languages_spoken")),
    ethnicity: optionalText(row, "ethnicity"),
    isManglik: optionalText(row, "is_manglik"),
    photoPath: text(row, "photo_path"),
    hideIncome: fromSqliteBoolean(integer(row, "hide_income")),
    photosVisibleTo: text(row, "photos_visible_to") as MatrimonialProfile["photosVisibleTo"],
    isPaused: fromSqliteBoolean(integer(row, "is_paused")),
    isVerified: fromSqliteBoolean(integer(row, "is_verified")),
    privacyConsentAt: optionalText(row, "privacy_consent_at"),
    seedWillReciprocateLikes: fromSqliteBoolean(integer(row, "seed_will_reciprocate_likes")),
    createdAt: text(row, "created_at"),
    updatedAt: text(row, "updated_at"),
  };
}

export function mapSqlRowToPartnerPreference(row: Row): PartnerPreference {
  return {
    userId: text(row, "user_id"),
    minAge: integer(row, "min_age"),
    maxAge: integer(row, "max_age"),
    minHeightCm: integer(row, "min_height_cm"),
    maxHeightCm: integer(row, "max_height_cm"),
    countries: parseJsonStringArray(optionalText(row, "countries")),
    religions: parseJsonStringArray(optionalText(row, "religions")),
    educationBands: parseJsonStringArray(optionalText(row, "education_bands")),
    maritalStatuses: parseJsonStringArray(optionalText(row, "marital_statuses")),
    diets: parseJsonStringArray(optionalText(row, "diets")),
    minIncomeAmount: optionalInteger(row, "min_income_amount"),
    minIncomeCurrency: optionalText(row, "min_income_currency"),
    updatedAt: text(row, "updated_at"),
  };
}
