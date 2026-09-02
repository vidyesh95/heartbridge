export function formatProfileLocation(city: string, region: string) {
  if (!region || region === city) {
    return city;
  }
  return `${city}, ${region}`;
}

export function formatCountryAndCity(countryName: string, city: string, region: string) {
  return `${formatProfileLocation(city, region)} · ${countryName}`;
}
