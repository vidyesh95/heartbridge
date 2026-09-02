/** Age is never stored. Always compute it from the ISO date of birth. */
export function computeAgeFromDateOfBirth(dateOfBirth: string, today = new Date()) {
  const birth = new Date(`${dateOfBirth}T00:00:00Z`);
  if (Number.isNaN(birth.getTime())) {
    return 0;
  }

  let age = today.getUTCFullYear() - birth.getUTCFullYear();
  const monthDelta = today.getUTCMonth() - birth.getUTCMonth();
  if (monthDelta < 0 || (monthDelta === 0 && today.getUTCDate() < birth.getUTCDate())) {
    age -= 1;
  }
  return age;
}

export function dateOfBirthFromApproximateAge(age: number, month = 6, day = 15) {
  const year = new Date().getUTCFullYear() - age;
  const monthText = String(month).padStart(2, "0");
  const dayText = String(day).padStart(2, "0");
  return `${year}-${monthText}-${dayText}`;
}

export function isAtLeastEighteen(dateOfBirth: string) {
  return computeAgeFromDateOfBirth(dateOfBirth) >= 18;
}
