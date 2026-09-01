import { redirect } from "next/navigation";
import { GoogleAuthCard } from "@/components/auth/google-auth-card";
import { oauthErrorMessage } from "@/lib/auth-utils";
import { getServerSession } from "@/lib/session";

export default async function SignIn({
  searchParams,
}: {
  searchParams: Promise<{ callbackURL?: string; error?: string }>;
}) {
  const session = await getServerSession();
  if (session) {
    redirect("/profiles");
  }

  const { callbackURL, error } = await searchParams;
  const nextPath =
    callbackURL?.startsWith("/") && !callbackURL.startsWith("//") ? callbackURL : "/profiles";

  return (
    <GoogleAuthCard
      title="Sign in"
      description="Continue with your Google account to sign in or create an account"
      callbackURL={nextPath}
      oauthError={oauthErrorMessage(error)}
    />
  );
}
