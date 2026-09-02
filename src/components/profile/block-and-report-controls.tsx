"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { blockThisMember, reportThisMember } from "@/app/actions/profile-social-actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { reportReasonOptions } from "@/domain/countries/shared-profile-options";

export function BlockAndReportControls({ profileUserId }: { profileUserId: string }) {
  const router = useRouter();
  const [reason, setReason] = useState("fake_profile");
  const [details, setDetails] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <div className="space-y-4 rounded-xl border p-4">
      <h3 className="font-semibold">Safety</h3>
      <p className="text-sm text-muted-foreground">
        Blocking hides both of you from each other. Reporting notifies an admin.
      </p>
      <Button
        type="button"
        variant="outline"
        disabled={pending}
        onClick={() => {
          startTransition(async () => {
            await blockThisMember(profileUserId);
            toast.success("This member is blocked.");
            router.push("/profiles");
          });
        }}
      >
        Block this member
      </Button>
      <Select value={reason} onValueChange={setReason}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {reportReasonOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Textarea
        placeholder="Optional details"
        value={details}
        onChange={(event) => setDetails(event.target.value)}
      />
      <Button
        type="button"
        variant="destructive"
        disabled={pending}
        onClick={() => {
          startTransition(async () => {
            await reportThisMember(profileUserId, reason, details);
            toast.success("Report sent to admins.");
          });
        }}
      >
        Report this profile
      </Button>
    </div>
  );
}
