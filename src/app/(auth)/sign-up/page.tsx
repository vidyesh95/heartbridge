import { redirect } from "next/navigation";
import { GoogleAuthCard } from "@/components/auth/google-auth-card";
import { oauthErrorMessage } from "@/lib/auth-utils";
import { getServerSession } from "@/lib/session";

export default async function SignUp({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await getServerSession();
  if (session) {
    redirect("/profiles");
  }

  const { error } = await searchParams;

  return (
    <GoogleAuthCard
      title="Sign up"
      description="Create an account with Google"
      switchLabel="Already have an account?"
      switchHref="/sign-in"
      switchText="Sign in"
      errorCallbackURL="/sign-up"
      oauthError={oauthErrorMessage(error)}
    />
  );
}
