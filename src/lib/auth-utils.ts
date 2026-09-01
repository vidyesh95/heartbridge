export function isAdminRole(role: unknown) {
  if (role === "admin") {
    return true;
  }
  return Array.isArray(role) && role.includes("admin");
}

const oauthErrorMessages: Record<string, string> = {
  access_denied: "Google sign-in was cancelled. Try again when you are ready.",
  state_mismatch: "This sign-in link expired. Please try again.",
  unable_to_get_user_info: "Google did not return your account details. Please try again.",
  unable_to_create_user: "Could not create your HeartBridge account. Please try again.",
  unable_to_link_account: "This Google account could not be linked. Sign in with the original method.",
  account_already_linked_to_different_user: "This Google account is already linked to another user.",
  signup_disabled: "New accounts are not being accepted right now.",
  email_not_found: "No HeartBridge account is associated with this Google email.",
};

export function oauthErrorMessage(error?: string | null) {
  if (!error) {
    return null;
  }
  return oauthErrorMessages[error] ?? "Google sign-in failed. Please try again.";
}
