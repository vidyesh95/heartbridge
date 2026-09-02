"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import {
  deleteMyAccountAndAllData,
  downloadMyAccountData,
  pauseOrResumeMyProfile,
} from "@/app/actions/inbox-and-settings-actions";
import { Button } from "@/components/ui/button";

export function AccountSettingsControls({ isPaused }: { isPaused: boolean }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="space-y-4">
      <Button
        type="button"
        variant="outline"
        disabled={pending}
        onClick={() => {
          startTransition(async () => {
            await pauseOrResumeMyProfile(!isPaused);
            toast.success(isPaused ? "Your profile is visible again." : "Your profile is hidden from browse.");
          });
        }}
      >
        {isPaused ? "Unpause my profile" : "Pause my profile"}
      </Button>

      <Button
        type="button"
        variant="outline"
        disabled={pending}
        onClick={() => {
          startTransition(async () => {
            const data = await downloadMyAccountData();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "heartbridge-my-data.json";
            link.click();
            URL.revokeObjectURL(url);
          });
        }}
      >
        Export my data (JSON)
      </Button>

      <Button
        type="button"
        variant="destructive"
        disabled={pending}
        onClick={() => {
          if (
            !window.confirm(
              "This permanently deletes your HeartBridge profile, likes, messages, and account. Continue?",
            )
          ) {
            return;
          }
          startTransition(async () => {
            await deleteMyAccountAndAllData();
          });
        }}
      >
        Delete my account and data
      </Button>
    </div>
  );
}
