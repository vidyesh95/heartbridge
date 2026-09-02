import { chinaCatalog } from "@/domain/countries/china";
import { germanyCatalog } from "@/domain/countries/germany";
import { indiaCatalog } from "@/domain/countries/india";
import {
  type CountryCatalog,
  type SupportedCountryCode,
  isSupportedCountryCode,
} from "@/domain/countries/supported-countries";
import { unitedStatesCatalog } from "@/domain/countries/united-states";

const catalogsByCountry: Record<SupportedCountryCode, CountryCatalog> = {
  IN: indiaCatalog,
  CN: chinaCatalog,
  US: unitedStatesCatalog,
  DE: germanyCatalog,
};

export function catalogForCountry(country: SupportedCountryCode): CountryCatalog {
  return catalogsByCountry[country];
}

export function catalogForCountryOrIndia(country: string | null | undefined): CountryCatalog {
  if (country && isSupportedCountryCode(country)) {
    return catalogsByCountry[country];
  }
  return indiaCatalog;
}

export function allCountryCatalogs() {
  return [indiaCatalog, chinaCatalog, unitedStatesCatalog, germanyCatalog];
}

/** Religions from every country, de-duplicated, for a global browse filter. */
export function religionsAcrossAllCountries() {
  const seen = new Set<string>();
  const religions: { value: string; label: string }[] = [];
  for (const catalog of allCountryCatalogs()) {
    for (const religion of catalog.religions) {
      if (seen.has(religion.value)) {
        continue;
      }
      seen.add(religion.value);
      religions.push(religion);
    }
  }
  return religions;
}
