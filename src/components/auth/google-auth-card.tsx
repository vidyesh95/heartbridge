"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

type GoogleAuthCardProps = {
  title: string;
  description: string;
  switchLabel: string;
  switchHref: "/sign-in" | "/sign-up";
  switchText: string;
  callbackURL?: string;
  errorCallbackURL?: "/sign-in" | "/sign-up";
  oauthError?: string | null;
};

export function GoogleAuthCard({
  title,
  description,
  switchLabel,
  switchHref,
  switchText,
  callbackURL = "/profiles",
  errorCallbackURL = "/sign-in",
  oauthError = null,
}: GoogleAuthCardProps) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(oauthError);

  async function handleGoogleSignIn() {
    setError(null);
    setIsPending(true);
    const { error: signInError } = await authClient.signIn.social({
      provider: "google",
      callbackURL,
      errorCallbackURL,
    });
    if (signInError) {
      setError(signInError.message ?? "Could not start Google sign-in.");
      setIsPending(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-4">
      <Link href="/" className="mb-2 text-center text-3xl font-bold text-primary">
        HeartBridge
      </Link>
      <p className="max-w-76 pb-6 text-center text-base text-gray-600">
        Personal assistance to facilitate introductions and guide both families through the process.
      </p>
      <Card className="w-88">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={isPending}
            onClick={handleGoogleSignIn}
          >
            <GoogleIcon />
            {isPending ? "Redirecting to Google..." : "Continue with Google"}
          </Button>
          <span className="flex justify-center gap-1">
            {switchLabel}
            <Link href={switchHref} className="font-semibold text-primary">
              {switchText}
            </Link>
          </span>
        </CardContent>
        <CardFooter className="text-xs">
          By continuing you accept&nbsp;
          <Link href="/privacy-policy">Privacy Policy</Link>
          &nbsp;and&nbsp;
          <Link href="/terms-of-service">Terms</Link>
        </CardFooter>
      </Card>
    </main>
  );
}
