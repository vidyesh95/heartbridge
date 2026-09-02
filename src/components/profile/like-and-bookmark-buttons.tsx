"use client";

import { useState, useTransition } from "react";
import { Bookmark, Heart } from "lucide-react";
import { toast } from "sonner";
import { bookmarkThisProfile, likeThisProfile } from "@/app/actions/profile-social-actions";
import { Button } from "@/components/ui/button";

export function LikeAndBookmarkButtons({
  profileUserId,
  initiallyLiked,
  initiallyBookmarked,
}: {
  profileUserId: string;
  initiallyLiked: boolean;
  initiallyBookmarked: boolean;
}) {
  const [liked, setLiked] = useState(initiallyLiked);
  const [bookmarked, setBookmarked] = useState(initiallyBookmarked);
  const [pending, startTransition] = useTransition();

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        type="button"
        variant="outline"
        disabled={pending}
        onClick={() => {
          startTransition(async () => {
            try {
              const result = await likeThisProfile(profileUserId);
              setLiked(result.liked);
              if (result.isMutualMatch) {
                toast.success("It is a match. You can message them from Inbox.");
              }
            } catch (error) {
              toast.error(error instanceof Error ? error.message : "Could not like this profile.");
            }
          });
        }}
      >
        <Heart className={liked ? "fill-red-500 text-red-500" : ""} />
        {liked ? "Liked" : "Like"}
      </Button>
      <Button
        type="button"
        variant="outline"
        disabled={pending}
        onClick={() => {
          startTransition(async () => {
            try {
              const result = await bookmarkThisProfile(profileUserId);
              setBookmarked(result.bookmarked);
            } catch (error) {
              toast.error(error instanceof Error ? error.message : "Could not bookmark this profile.");
            }
          });
        }}
      >
        <Bookmark className={bookmarked ? "fill-current" : ""} />
        {bookmarked ? "Saved" : "Bookmark"}
      </Button>
    </div>
  );
}
