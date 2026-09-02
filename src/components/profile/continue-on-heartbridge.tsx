"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth-client";

export function continueOnHeartbridgeHref(isSignedIn: boolean) {
  return isSignedIn ? "/onboarding" : "/sign-in?callbackURL=/onboarding";
}

export function ContinueOnHeartbridgeDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { data: session } = authClient.useSession();
  const href = continueOnHeartbridgeHref(Boolean(session));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a profile to continue</DialogTitle>
          <DialogDescription>
            Anyone can browse listings. Like, bookmark, chat, contact details, and medical history
            stay on HeartBridge after you create your own profile.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Keep browsing
          </Button>
          <Button asChild>
            <Link href={href}>{session ? "Create profile" : "Sign in to create a profile"}</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ContinueOnHeartbridgeCard() {
  const { data: session } = authClient.useSession();
  const href = continueOnHeartbridgeHref(Boolean(session));

  return (
    <div className="space-y-3 rounded-xl border p-4">
      <h3 className="font-semibold">Continue on HeartBridge</h3>
      <p className="text-sm text-muted-foreground">
        Sign in to like, bookmark, chat, or request contact details and medical history.
      </p>
      <Button className="w-full" asChild>
        <Link href={href}>{session ? "Create profile" : "Sign in"}</Link>
      </Button>
    </div>
  );
}

