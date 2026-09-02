import type { SupportedCurrency } from "@/domain/countries/supported-countries";
import { catalogForCountry } from "@/domain/countries/catalog-for-country";

const localeForCurrency: Record<SupportedCurrency, string> = {
  INR: "en-IN",
  CNY: "zh-CN",
  USD: "en-US",
  EUR: "de-DE",
};

export function formatIncomeAmount(amount: number, currency: SupportedCurrency) {
  return new Intl.NumberFormat(localeForCurrency[currency], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatIncomeForCountry(
  amount: number,
  currency: SupportedCurrency,
  hidden: boolean,
) {
  if (hidden) {
    return "Income hidden";
  }
  return formatIncomeAmount(amount, currency);
}

export function currencyForCountryCode(country: "IN" | "CN" | "US" | "DE"): SupportedCurrency {
  return catalogForCountry(country).currency;
}
