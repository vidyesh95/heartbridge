import type { HeightDisplayUnit } from "@/domain/countries/supported-countries";

const centimetersPerInch = 2.54;

export function formatHeightFromCentimeters(
  heightCm: number,
  unit: HeightDisplayUnit = "centimeters",
) {
  if (unit === "centimeters") {
    return `${Math.round(heightCm)} cm`;
  }

  const totalInches = heightCm / centimetersPerInch;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches - feet * 12);
  if (inches === 12) {
    return `${feet + 1}'0"`;
  }
  return `${feet}'${inches}"`;
}

export function centimetersFromFeetAndInches(feet: number, inches: number) {
  return Math.round((feet * 12 + inches) * centimetersPerInch);
}

export function feetAndInchesFromCentimeters(heightCm: number) {
  const totalInches = heightCm / centimetersPerInch;
  let feet = Math.floor(totalInches / 12);
  let inches = Math.round(totalInches - feet * 12);
  if (inches === 12) {
    feet += 1;
    inches = 0;
  }
  return { feet, inches };
}
