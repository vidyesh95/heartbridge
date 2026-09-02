/**
 * Options that every country shares. Country catalogs add extra religions and cities on top.
 * Values are stored in the database; labels are what the English UI shows.
 */

export const genderOptions = [
  { value: "male", label: "Man" },
  { value: "female", label: "Woman" },
] as const;

export type GenderValue = (typeof genderOptions)[number]["value"];

export const maritalStatusOptions = [
  { value: "never_married", label: "Never married" },
  { value: "divorced", label: "Divorced" },
  { value: "widowed", label: "Widowed" },
  { value: "separated", label: "Separated" },
] as const;

export type MaritalStatusValue = (typeof maritalStatusOptions)[number]["value"];

export const educationBandOptions = [
  { value: "high_school", label: "High school" },
  { value: "diploma", label: "Diploma" },
  { value: "bachelors", label: "Bachelor's" },
  { value: "masters", label: "Master's" },
  { value: "doctorate", label: "Doctorate / PhD" },
  { value: "other", label: "Other" },
] as const;

export type EducationBandValue = (typeof educationBandOptions)[number]["value"];

export const dietOptions = [
  { value: "vegetarian", label: "Vegetarian" },
  { value: "eggetarian", label: "Eggetarian" },
  { value: "non_vegetarian", label: "Non-vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "no_preference", label: "No preference" },
] as const;

export type DietValue = (typeof dietOptions)[number]["value"];

export const habitOptions = [
  { value: "never", label: "Never" },
  { value: "occasionally", label: "Occasionally" },
  { value: "regularly", label: "Regularly" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
] as const;

export type HabitValue = (typeof habitOptions)[number]["value"];

export const hasChildrenOptions = [
  { value: "none", label: "No children" },
  { value: "has_children", label: "Have children" },
] as const;

export type HasChildrenValue = (typeof hasChildrenOptions)[number]["value"];

export const wantsChildrenOptions = [
  { value: "yes", label: "Want children" },
  { value: "no", label: "Do not want children" },
  { value: "open", label: "Open to children" },
] as const;

export type WantsChildrenValue = (typeof wantsChildrenOptions)[number]["value"];

export const familyTypeOptions = [
  { value: "nuclear", label: "Nuclear family" },
  { value: "joint", label: "Joint family" },
] as const;

export type FamilyTypeValue = (typeof familyTypeOptions)[number]["value"];

export const manglikOptions = [
  { value: "yes", label: "Manglik" },
  { value: "no", label: "Not manglik" },
  { value: "unknown", label: "I do not know" },
] as const;

export type ManglikValue = (typeof manglikOptions)[number]["value"];

export const photoVisibilityOptions = [
  { value: "everyone", label: "Everyone who can see my profile" },
  { value: "likes_only", label: "People I have liked" },
  { value: "matches_only", label: "Mutual matches only" },
] as const;

export type PhotoVisibilityValue = (typeof photoVisibilityOptions)[number]["value"];

export const reportReasonOptions = [
  { value: "fake_profile", label: "Fake or stolen photos" },
  { value: "harassment", label: "Harassment or abusive messages" },
  { value: "spam", label: "Spam or advertising" },
  { value: "underage", label: "Appears to be under 18" },
  { value: "other", label: "Something else" },
] as const;

export function labelForOption<T extends string>(
  options: readonly { value: T; label: string }[],
  value: string | null | undefined,
) {
  return options.find((option) => option.value === value)?.label ?? value ?? "—";
}

/** Map a specific degree label (B.Tech, MBA) onto a filter band. */
export function educationBandFromDegreeLabel(degreeLabel: string): EducationBandValue {
  const normalized = degreeLabel.toLowerCase();
  if (normalized.includes("phd") || normalized.includes("doctorate") || normalized.includes("mphil")) {
    return normalized.includes("mphil") ? "masters" : "doctorate";
  }
  if (
    normalized.includes("master") ||
    normalized.startsWith("m.") ||
    ["mba", "mca", "m.sc", "m.tech", "ma", "msc"].some((token) => normalized.includes(token))
  ) {
    return "masters";
  }
  if (normalized.includes("diploma")) {
    return "diploma";
  }
  if (normalized.includes("high school") || normalized.includes("secondary")) {
    return "high_school";
  }
  if (
    normalized.includes("bachelor") ||
    normalized.startsWith("b.") ||
    ["b.tech", "btech", "b.e.", "be", "b.com", "bba", "ba", "bca", "llb", "mbbs", "b.pharma", "b.ed"].some(
      (token) => normalized.includes(token),
    )
  ) {
    return "bachelors";
  }
  return "other";
}
