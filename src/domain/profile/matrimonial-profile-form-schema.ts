import { z } from "zod/v4";
import { educationBandOptions } from "@/domain/countries/shared-profile-options";
import { supportedCountryCodes } from "@/domain/countries/supported-countries";
import { isAtLeastEighteen } from "@/domain/display/compute-age-from-date-of-birth";

const educationBandValues = educationBandOptions.map((option) => option.value) as [
  (typeof educationBandOptions)[number]["value"],
  ...(typeof educationBandOptions)[number]["value"][],
];

export const matrimonialProfileFormSchema = z
  .object({
    displayName: z.string().min(2, { error: "Name must be at least 2 characters." }),
    country: z.enum(supportedCountryCodes),
    gender: z.enum(["male", "female"]),
    seekingGender: z.enum(["male", "female"]),
    dateOfBirth: z.string().refine(isAtLeastEighteen, { error: "You must be at least 18 years old." }),
    heightCm: z.number().min(120).max(230),
    city: z.string().min(1, { error: "City is required." }),
    region: z.string().min(1, { error: "State or region is required." }),
    religion: z.string().min(1, { error: "Religion is required. You may choose Prefer not to say." }),
    education: z.string().min(1, { error: "Education is required." }),
    educationBand: z.enum(educationBandValues),
    profession: z.string().min(1, { error: "Profession is required." }),
    annualIncomeAmount: z.number().min(0),
    maritalStatus: z.enum(["never_married", "divorced", "widowed", "separated"]),
    diet: z.enum(["vegetarian", "eggetarian", "non_vegetarian", "vegan", "no_preference"]),
    smoking: z.enum(["never", "occasionally", "regularly", "prefer_not_to_say"]),
    drinking: z.enum(["never", "occasionally", "regularly", "prefer_not_to_say"]),
    aboutMe: z
      .string()
      .min(40, { error: "Write at least a short paragraph about yourself (40 characters)." })
      .max(2000),
    motherTongue: z.string().optional(),
    community: z.string().optional(),
    familyType: z.enum(["nuclear", "joint"]).optional(),
    isOnlyChild: z.boolean().optional(),
    hasChildren: z.enum(["none", "has_children"]),
    wantsChildren: z.enum(["yes", "no", "open"]),
    languagesSpoken: z.string().min(1, { error: "List at least one language you speak." }),
    ethnicity: z.string().optional(),
    isManglik: z.enum(["yes", "no", "unknown"]).optional(),
    hideIncome: z.boolean(),
    photosVisibleTo: z.enum(["everyone", "likes_only", "matches_only"]),
    acceptedPrivacyTerms: z.boolean(),
    prefMinAge: z.number().min(18).max(80),
    prefMaxAge: z.number().min(18).max(80),
    prefMinHeightCm: z.number().min(120).max(230),
    prefMaxHeightCm: z.number().min(120).max(230),
    prefCountries: z.array(z.string()),
    prefReligions: z.array(z.string()),
    prefEducationBands: z.array(z.string()),
  })
  .refine((value) => value.prefMinAge <= value.prefMaxAge, {
    error: "Minimum preferred age cannot be above the maximum.",
    path: ["prefMaxAge"],
  })
  .refine((value) => value.prefMinHeightCm <= value.prefMaxHeightCm, {
    error: "Minimum preferred height cannot be above the maximum.",
    path: ["prefMaxHeightCm"],
  });

export type MatrimonialProfileFormValues = z.infer<typeof matrimonialProfileFormSchema>;
