import type { MatrimonialProfile, PartnerPreference } from "@/db/types";
import type { MatrimonialProfileFormValues } from "@/domain/profile/matrimonial-profile-form-schema";
import type { SupportedCountryCode } from "@/domain/countries/supported-countries";

export function defaultProfileFormValues(input: {
  displayName: string;
  country?: SupportedCountryCode;
  existingProfile?: MatrimonialProfile | null;
  existingPreference?: PartnerPreference | null;
}): MatrimonialProfileFormValues {
  const profile = input.existingProfile;
  const preference = input.existingPreference;
  const country = profile?.country ?? input.country ?? "IN";

  return {
    displayName: profile?.displayName ?? input.displayName,
    country,
    gender: profile?.gender ?? "male",
    seekingGender: profile?.seekingGender ?? "female",
    dateOfBirth: profile?.dateOfBirth ?? "1996-06-15",
    heightCm: profile?.heightCm ?? 170,
    city: profile?.city ?? "",
    region: profile?.region ?? "",
    religion: profile?.religion ?? "",
    education: profile?.education ?? "",
    educationBand: profile?.educationBand ?? "bachelors",
    profession: profile?.profession ?? "",
    annualIncomeAmount: profile?.annualIncomeAmount ?? 0,
    maritalStatus: (profile?.maritalStatus as MatrimonialProfileFormValues["maritalStatus"]) ?? "never_married",
    diet: (profile?.diet as MatrimonialProfileFormValues["diet"]) ?? "no_preference",
    smoking: (profile?.smoking as MatrimonialProfileFormValues["smoking"]) ?? "never",
    drinking: (profile?.drinking as MatrimonialProfileFormValues["drinking"]) ?? "never",
    aboutMe: profile?.aboutMe ?? "",
    motherTongue: profile?.motherTongue ?? "",
    community: profile?.community ?? "",
    familyType: (profile?.familyType as MatrimonialProfileFormValues["familyType"]) ?? "nuclear",
    isOnlyChild: profile?.isOnlyChild ?? false,
    hasChildren: (profile?.hasChildren as MatrimonialProfileFormValues["hasChildren"]) ?? "none",
    wantsChildren: (profile?.wantsChildren as MatrimonialProfileFormValues["wantsChildren"]) ?? "open",
    languagesSpoken: profile?.languagesSpoken.join(", ") ?? "English",
    ethnicity: profile?.ethnicity ?? "prefer_not_to_say",
    isManglik: (profile?.isManglik as MatrimonialProfileFormValues["isManglik"]) ?? "unknown",
    hideIncome: profile?.hideIncome ?? false,
    photosVisibleTo: profile?.photosVisibleTo ?? "everyone",
    acceptedPrivacyTerms: Boolean(profile?.privacyConsentAt),
    prefMinAge: preference?.minAge ?? 23,
    prefMaxAge: preference?.maxAge ?? 35,
    prefMinHeightCm: preference?.minHeightCm ?? 150,
    prefMaxHeightCm: preference?.maxHeightCm ?? 190,
    prefCountries: preference?.countries ?? [country],
    prefReligions: preference?.religions ?? [],
    prefEducationBands: preference?.educationBands ?? [],
  };
}
