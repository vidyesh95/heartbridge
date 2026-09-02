import type { MatrimonialProfile } from "@/db/types";

export function canViewerSeeThisPhoto(
  profile: Pick<MatrimonialProfile, "photosVisibleTo">,
  context: { isOwnProfile: boolean; viewerHasLiked: boolean; isMutualMatch: boolean },
) {
  if (context.isOwnProfile) {
    return true;
  }
  if (profile.photosVisibleTo === "everyone") {
    return true;
  }
  if (profile.photosVisibleTo === "likes_only") {
    return context.viewerHasLiked;
  }
  return context.isMutualMatch;
}
