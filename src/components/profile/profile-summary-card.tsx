import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LikeAndBookmarkButtons } from "@/components/profile/like-and-bookmark-buttons";
import { ProfilePhoto } from "@/components/profile/profile-photo";
import { catalogForCountry } from "@/domain/countries/catalog-for-country";
import { computeAgeFromDateOfBirth } from "@/domain/display/compute-age-from-date-of-birth";
import { formatHeightFromCentimeters } from "@/domain/display/format-height";
import { formatIncomeForCountry } from "@/domain/display/format-income";
import { formatCountryAndCity } from "@/domain/display/format-profile-location";
import { canViewerSeeThisPhoto } from "@/domain/profile/can-viewer-see-this-photo";
import type { MatrimonialProfile } from "@/db/types";

export function ProfileSummaryCard({
  profile,
  viewerHasLiked = false,
  viewerHasBookmarked = false,
  isMutualMatch = false,
  showActions = true,
  viewerCanAct = true,
}: {
  profile: MatrimonialProfile;
  viewerHasLiked?: boolean;
  viewerHasBookmarked?: boolean;
  isMutualMatch?: boolean;
  showActions?: boolean;
  viewerCanAct?: boolean;
}) {
  const catalog = catalogForCountry(profile.country);
  const age = computeAgeFromDateOfBirth(profile.dateOfBirth);
  const photoVisible = canViewerSeeThisPhoto(profile, {
    isOwnProfile: false,
    viewerHasLiked,
    isMutualMatch,
  });

  return (
    <Card className="w-full overflow-hidden pt-0">
      <CardHeader className="px-0">
        <Link href={`/profiles/${profile.userId}`}>
          <ProfilePhoto photoPath={profile.photoPath} name={profile.displayName} visible={photoVisible} />
        </Link>
      </CardHeader>
      <CardContent>
        <Link href={`/profiles/${profile.userId}`} className="mb-2 flex items-center gap-2">
          <h5 className="text-lg font-semibold text-primary">{profile.displayName}</h5>
          {profile.isVerified ? <Badge variant="secondary">Verified</Badge> : null}
        </Link>
        <p>
          {age} • {formatHeightFromCentimeters(profile.heightCm, catalog.heightDisplayUnit)} •{" "}
          {formatCountryAndCity(catalog.englishName, profile.city, profile.region)}
        </p>
        <p>
          Annual income: {formatIncomeForCountry(profile.annualIncomeAmount, profile.incomeCurrency, profile.hideIncome)}
        </p>
        <p>Religion: {profile.religion}</p>
        <p>Education: {profile.education}</p>
        <p>Profession: {profile.profession}</p>
      </CardContent>
      {showActions ? (
        <CardFooter>
          <LikeAndBookmarkButtons
            profileUserId={profile.userId}
            initiallyLiked={viewerHasLiked}
            initiallyBookmarked={viewerHasBookmarked}
            viewerCanAct={viewerCanAct}
          />
        </CardFooter>
      ) : null}
    </Card>
  );
}
