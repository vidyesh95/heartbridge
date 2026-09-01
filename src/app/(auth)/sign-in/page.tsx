import { redirect } from "next/navigation";
import { GoogleAuthCard } from "@/components/auth/google-auth-card";
import { getServerSession } from "@/lib/session";

export default async function SignIn({
  searchParams,
}: {
  searchParams: Promise<{ callbackURL?: string }>;
}) {
  const session = await getServerSession();
  if (session) {
    redirect("/profiles");
  }

  const { callbackURL } = await searchParams;
  const nextPath =
    callbackURL?.startsWith("/") && !callbackURL.startsWith("//") ? callbackURL : "/profiles";

  return (
    <GoogleAuthCard
      title="Sign in"
      description="Continue with your Google account"
      switchLabel="Don't have an account?"
      switchHref="/sign-up"
      switchText="Sign up"
      callbackURL={nextPath}
    />
  );
}
