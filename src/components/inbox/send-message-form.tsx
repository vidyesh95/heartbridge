"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { sendMessageToMatch } from "@/app/actions/inbox-and-settings-actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function SendMessageForm({ conversationId }: { conversationId: string }) {
  const [body, setBody] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        startTransition(async () => {
          try {
            await sendMessageToMatch(conversationId, body);
            setBody("");
          } catch (error) {
            toast.error(error instanceof Error ? error.message : "Could not send that message.");
          }
        });
      }}
    >
      <Textarea
        value={body}
        onChange={(event) => setBody(event.target.value)}
        placeholder="Write a message"
        rows={3}
      />
      <Button type="submit" disabled={pending || !body.trim()}>
        {pending ? "Sending…" : "Send"}
      </Button>
    </form>
  );
}
