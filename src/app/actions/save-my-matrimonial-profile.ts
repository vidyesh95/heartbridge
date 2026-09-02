"use server";

import { revalidatePath } from "next/cache";
import { catalogForCountry } from "@/domain/countries/catalog-for-country";
import {
  matrimonialProfileFormSchema,
  type MatrimonialProfileFormValues,
} from "@/domain/profile/matrimonial-profile-form-schema";
import { findMatrimonialProfileForUser } from "@/db/queries/find-matrimonial-profile-for-user";
import { saveMatrimonialProfile, savePartnerPreference } from "@/db/queries/save-matrimonial-profile";
import { nowAsIsoTimestamp } from "@/db/turso-client";
import { requireSession } from "@/lib/session";

function languagesFromCommaList(value: string) {
  return value
    .split(",")
    .map((language) => language.trim())
    .filter(Boolean);
}

export async function saveMyMatrimonialProfile(rawValues: MatrimonialProfileFormValues) {
  const session = await requireSession();
  const parsed = matrimonialProfileFormSchema.safeParse(rawValues);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  const values = parsed.data;
  const catalog = catalogForCountry(values.country);
  const existing = await findMatrimonialProfileForUser(session.user.id);

  if (catalog.extraFields.requirePrivacyConsent && !existing?.privacyConsentAt && !values.acceptedPrivacyTerms) {
    return {
      ok: false as const,
      error: "German profiles require an explicit privacy consent before we can save.",
    };
  }

  const photoPath = existing?.photoPath || session.user.image || "/profile1.avif";
  const privacyConsentAt =
    existing?.privacyConsentAt ??
    (values.acceptedPrivacyTerms || catalog.extraFields.requirePrivacyConsent
      ? nowAsIsoTimestamp()
      : values.acceptedPrivacyTerms
        ? nowAsIsoTimestamp()
        : null);

  await saveMatrimonialProfile({
    userId: session.user.id,
    displayName: values.displayName,
    country: values.country,
    gender: values.gender,
    seekingGender: values.seekingGender,
    dateOfBirth: values.dateOfBirth,
    heightCm: values.heightCm,
    city: values.city,
    region: values.region,
    religion: values.religion,
    education: values.education,
    educationBand: values.educationBand,
    profession: values.profession,
    annualIncomeAmount: values.annualIncomeAmount,
    incomeCurrency: catalog.currency,
    maritalStatus: values.maritalStatus,
    diet: values.diet,
    smoking: values.smoking,
    drinking: values.drinking,
    aboutMe: values.aboutMe,
    motherTongue: catalog.extraFields.motherTongue ? values.motherTongue || null : null,
    community: catalog.extraFields.community ? values.community || null : null,
    familyType: catalog.extraFields.familyType ? values.familyType || null : null,
    isOnlyChild: catalog.extraFields.onlyChild ? Boolean(values.isOnlyChild) : null,
    hasChildren: values.hasChildren,
    wantsChildren: values.wantsChildren,
    languagesSpoken: languagesFromCommaList(values.languagesSpoken),
    ethnicity: catalog.extraFields.ethnicity ? values.ethnicity || "prefer_not_to_say" : null,
    isManglik: catalog.extraFields.manglik ? values.isManglik || null : null,
    photoPath,
    hideIncome: values.hideIncome,
    photosVisibleTo: values.photosVisibleTo,
    isPaused: existing?.isPaused ?? false,
    privacyConsentAt,
  });

  await savePartnerPreference({
    userId: session.user.id,
    minAge: values.prefMinAge,
    maxAge: values.prefMaxAge,
    minHeightCm: values.prefMinHeightCm,
    maxHeightCm: values.prefMaxHeightCm,
    countries: values.prefCountries,
    religions: values.prefReligions,
    educationBands: values.prefEducationBands,
    maritalStatuses: [],
    diets: [],
    minIncomeAmount: null,
    minIncomeCurrency: null,
  });

  revalidatePath("/profiles");
  revalidatePath("/me");
  revalidatePath("/onboarding");

  return { ok: true as const };
}
