/**
 * The four countries HeartBridge is built for.
 * Every profile must pick one. Catalogs, currency, and height units come from this code.
 */
export const supportedCountryCodes = ["IN", "CN", "US", "DE"] as const;

export type SupportedCountryCode = (typeof supportedCountryCodes)[number];

export const supportedCurrencies = ["INR", "CNY", "USD", "EUR"] as const;

export type SupportedCurrency = (typeof supportedCurrencies)[number];

export type HeightDisplayUnit = "centimeters" | "feet_and_inches";

export type CountryCatalog = {
  code: SupportedCountryCode;
  englishName: string;
  currency: SupportedCurrency;
  currencySymbol: string;
  heightDisplayUnit: HeightDisplayUnit;
  /** Typical yearly income slider max in that country's currency. */
  incomeSliderMax: number;
  incomeSliderStep: number;
  religions: readonly { value: string; label: string }[];
  cities: readonly { city: string; region: string }[];
  /** Fields the onboarding and edit forms should show for this country. */
  extraFields: {
    motherTongue: boolean;
    community: boolean;
    familyType: boolean;
    onlyChild: boolean;
    ethnicity: boolean;
    manglik: boolean;
    /** German profiles cannot be saved until the member ticks this. */
    requirePrivacyConsent: boolean;
  };
};

export function isSupportedCountryCode(value: string): value is SupportedCountryCode {
  return (supportedCountryCodes as readonly string[]).includes(value);
}

export function countryEnglishName(code: SupportedCountryCode) {
  switch (code) {
    case "IN":
      return "India";
    case "CN":
      return "China";
    case "US":
      return "United States";
    case "DE":
      return "Germany";
  }
}
