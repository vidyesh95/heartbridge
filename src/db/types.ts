import type { EducationBandValue } from "@/domain/countries/shared-profile-options";
import type { SupportedCountryCode, SupportedCurrency } from "@/domain/countries/supported-countries";

export type MatrimonialProfile = {
  userId: string;
  displayName: string;
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
  motherTongue: string | null;
  community: string | null;
  familyType: string | null;
  isOnlyChild: boolean | null;
  hasChildren: string;
  wantsChildren: string;
  languagesSpoken: string[];
  ethnicity: string | null;
  isManglik: string | null;
  photoPath: string;
  hideIncome: boolean;
  photosVisibleTo: "everyone" | "likes_only" | "matches_only";
  isPaused: boolean;
  isVerified: boolean;
  privacyConsentAt: string | null;
  seedWillReciprocateLikes: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PartnerPreference = {
  userId: string;
  minAge: number;
  maxAge: number;
  minHeightCm: number;
  maxHeightCm: number;
  countries: string[];
  religions: string[];
  educationBands: string[];
  maritalStatuses: string[];
  diets: string[];
  minIncomeAmount: number | null;
  minIncomeCurrency: string | null;
  updatedAt: string;
};

export type ProfileSearchFilters = {
  country?: SupportedCountryCode | "all";
  gender?: "male" | "female" | "all";
  ageMin?: number;
  ageMax?: number;
  incomeMin?: number;
  incomeMax?: number;
  heightMinCm?: number;
  heightMaxCm?: number;
  city?: string;
  religions?: string[];
  educationBands?: string[];
  maritalStatuses?: string[];
};

export type ConversationSummary = {
  id: string;
  otherUserId: string;
  otherDisplayName: string;
  otherPhotoPath: string;
  lastMessageBody: string | null;
  lastMessageAt: string | null;
  unreadCount: number;
};

export type ConversationMessage = {
  id: string;
  conversationId: string;
  senderUserId: string;
  body: string;
  createdAt: string;
  readAt: string | null;
};

export type ProfileReportRow = {
  id: string;
  reporterUserId: string;
  reporterName: string;
  reportedUserId: string;
  reportedName: string;
  reason: string;
  details: string | null;
  createdAt: string;
};

export type ProfileWriteInput = Omit<
  MatrimonialProfile,
  "createdAt" | "updatedAt" | "seedWillReciprocateLikes" | "isVerified"
> & {
  seedWillReciprocateLikes?: boolean;
  isVerified?: boolean;
};
