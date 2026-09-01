import { redirect } from "next/navigation";
import { GoogleAuthCard } from "@/components/auth/google-auth-card";
import { getServerSession } from "@/lib/session";

export default async function SignUp() {
  const session = await getServerSession();
  if (session) {
    redirect("/profiles");
  }

  return (
    <GoogleAuthCard
      title="Sign up"
      description="Create an account with Google"
      switchLabel="Already have an account?"
      switchHref="/sign-in"
      switchText="Sign in"
    />
  );
}
