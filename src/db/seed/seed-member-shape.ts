import type { EducationBandValue } from "@/domain/countries/shared-profile-options";
import type { SupportedCountryCode, SupportedCurrency } from "@/domain/countries/supported-countries";

/** One demo person: a Better Auth user row plus a full matrimonial profile. */
export type SeedMember = {
  userId: string;
  displayName: string;
  emailLocalPart: string;
  country: SupportedCountryCode;
  gender: "male" | "female";
  seekingGender: "male" | "female";
  dateOfBirth: string;
  heightCm: number;
  city: string;
  region: string;
  religion: string;
  education: string;
  educationBand: EducationBandValue;
  profession: string;
  annualIncomeAmount: number;
  incomeCurrency: SupportedCurrency;
  maritalStatus: string;
  diet: string;
  smoking: string;
  drinking: string;
  aboutMe: string;
  motherTongue?: string;
  community?: string;
  familyType?: string;
  isOnlyChild?: boolean;
  hasChildren: string;
  wantsChildren: string;
  languagesSpoken: string[];
  ethnicity?: string;
  isManglik?: string;
  photoPath: string;
  hideIncome?: boolean;
  medicalStatus: "clear" | "has_notes";
  medicalNotes?: string | null;
  seedWillReciprocateLikes: boolean;
  preference: {
    minAge: number;
    maxAge: number;
    minHeightCm: number;
    maxHeightCm: number;
    countries: string[];
    religions: string[];
    educationBands: string[];
  };
};

export function seedEmail(localPart: string) {
  return `${localPart}@seed.heartbridge.local`;
}
