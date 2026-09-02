import { computeAgeFromDateOfBirth } from "@/domain/display/compute-age-from-date-of-birth";
import type { MatrimonialProfile, PartnerPreference } from "@/db/types";

export const PUBLIC_LISTING_LIMIT = 50;

export type PublicProfileListing = {
  id: string;
  publicUrl: string;
  displayName: string;
  age: number;
  gender: "male" | "female";
  country: string;
  city: string;
  region: string;
  heightCm: number;
  education: string;
  profession: string;
  religion: string;
  maritalStatus: string;
  aboutMe: string;
  isVerified: boolean;
  photoPath: string | null;
  annualIncomeAmount: number | null;
  incomeCurrency: string | null;
};

export function publicListingFromProfile(profile: MatrimonialProfile, origin: string): PublicProfileListing {
  const photoVisible = profile.photosVisibleTo === "everyone";
  return {
    id: profile.userId,
    publicUrl: `${origin}/profiles/${profile.userId}`,
    displayName: profile.displayName,
    age: computeAgeFromDateOfBirth(profile.dateOfBirth),
    gender: profile.gender,
    country: profile.country,
    city: profile.city,
    region: profile.region,
    heightCm: profile.heightCm,
    education: profile.education,
    profession: profile.profession,
    religion: profile.religion,
    maritalStatus: profile.maritalStatus,
    aboutMe: profile.aboutMe,
    isVerified: profile.isVerified,
    photoPath: photoVisible ? profile.photoPath : null,
    annualIncomeAmount: profile.hideIncome ? null : profile.annualIncomeAmount,
    incomeCurrency: profile.hideIncome ? null : profile.incomeCurrency,
  };
}

export function publicPreferenceFromPartner(preference: PartnerPreference | null) {
  if (!preference) {
    return null;
  }
  return {
    minAge: preference.minAge,
    maxAge: preference.maxAge,
    minHeightCm: preference.minHeightCm,
    maxHeightCm: preference.maxHeightCm,
    countries: preference.countries,
    religions: preference.religions,
    educationBands: preference.educationBands,
    maritalStatuses: preference.maritalStatuses,
  };
}
