export function isAdminRole(role: unknown) {
  if (role === "admin") {
    return true;
  }
  return Array.isArray(role) && role.includes("admin");
}
