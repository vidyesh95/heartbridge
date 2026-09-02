import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlockAndReportControls } from "@/components/profile/block-and-report-controls";
import { ContinueOnHeartbridgeCard } from "@/components/profile/continue-on-heartbridge";
import { LikeAndBookmarkButtons } from "@/components/profile/like-and-bookmark-buttons";
import { ProfilePhoto } from "@/components/profile/profile-photo";
import { catalogForCountry, catalogForCountryOrIndia } from "@/domain/countries/catalog-for-country";
import {
  dietOptions,
  educationBandOptions,
  familyTypeOptions,
  habitOptions,
  hasChildrenOptions,
  labelForOption,
  manglikOptions,
  maritalStatusOptions,
  wantsChildrenOptions,
} from "@/domain/countries/shared-profile-options";
import { computeAgeFromDateOfBirth } from "@/domain/display/compute-age-from-date-of-birth";
import { formatHeightFromCentimeters } from "@/domain/display/format-height";
import { formatIncomeForCountry } from "@/domain/display/format-income";
import { formatCountryAndCity } from "@/domain/display/format-profile-location";
import { canViewerSeeThisPhoto } from "@/domain/profile/can-viewer-see-this-photo";
import { getProfileByIdForViewer } from "@/db/queries/get-profile-by-id";
import { getOptionalBrowseViewer } from "@/lib/require-completed-matrimonial-profile";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const detail = await getProfileByIdForViewer(id);
  if (!detail || detail.profile.isPaused) {
    return { title: "Profile" };
  }
  const age = computeAgeFromDateOfBirth(detail.profile.dateOfBirth);
  return {
    title: `${detail.profile.displayName}, ${age}`,
    description: `${detail.profile.displayName} is ${age} in ${detail.profile.city}. ${detail.profile.profession}.`,
    alternates: { canonical: `/profiles/${id}` },
  };
}

export default async function Profile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { session, profile: viewerProfile } = await getOptionalBrowseViewer();
  const viewerCanAct = Boolean(viewerProfile);

  if (session && id === session.user.id) {
    return (
      <section className="mx-auto max-w-3xl space-y-4 px-4 pt-24 text-center">
        <h1 className="text-4xl">This is your profile</h1>
        <Button asChild>
          <Link href="/me">Edit my profile</Link>
        </Button>
      </section>
    );
  }

  const detail = await getProfileByIdForViewer(id, session?.user.id);
  if (!detail || detail.profile.isPaused) {
    notFound();
  }

  const { profile, preference } = detail;
  const catalog = catalogForCountry(profile.country);
  const viewerCatalog = viewerProfile
    ? catalogForCountry(viewerProfile.country)
    : catalogForCountryOrIndia(profile.country);
  const age = computeAgeFromDateOfBirth(profile.dateOfBirth);
  const photoVisible = canViewerSeeThisPhoto(profile, {
    isOwnProfile: false,
    viewerHasLiked: detail.viewerHasLiked,
    isMutualMatch: detail.isMutualMatch,
  });

  return (
    <section className="mx-auto grid w-full max-w-5xl gap-8 px-4 pt-24 pb-16 md:grid-cols-[320px_1fr]">
      <div className="space-y-4">
        <ProfilePhoto
          photoPath={profile.photoPath}
          name={profile.displayName}
          visible={photoVisible}
          className="rounded-xl"
        />
        {!photoVisible ? (
          <p className="text-sm text-muted-foreground">
            This member only shows their photo to {profile.photosVisibleTo.replaceAll("_", " ")}.
          </p>
        ) : null}
        <LikeAndBookmarkButtons
          profileUserId={profile.userId}
          initiallyLiked={detail.viewerHasLiked}
          initiallyBookmarked={detail.viewerHasBookmarked}
          viewerCanAct={viewerCanAct}
        />
        {viewerCanAct ? (
          detail.isMutualMatch && detail.conversationId ? (
            <Button className="w-full" asChild>
              <Link href={`/inbox/${detail.conversationId}`}>Open conversation</Link>
            </Button>
          ) : (
            <p className="text-sm text-muted-foreground">
              Messaging unlocks when you both like each other.
            </p>
          )
        ) : (
          <ContinueOnHeartbridgeCard />
        )}
        {viewerCanAct ? <BlockAndReportControls profileUserId={profile.userId} /> : null}
      </div>

      <div className="space-y-6">
        <hgroup className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-4xl text-secondary-foreground">{profile.displayName}</h1>
            {profile.isVerified ? <Badge>Verified</Badge> : null}
          </div>
          <p className="text-muted-foreground">
            {age} years • {formatHeightFromCentimeters(profile.heightCm, viewerCatalog.heightDisplayUnit)} •{" "}
            {formatCountryAndCity(catalog.englishName, profile.city, profile.region)}
          </p>
        </hgroup>

        <p className="whitespace-pre-wrap">{profile.aboutMe}</p>

        <dl className="grid gap-3 sm:grid-cols-2">
          <Fact label="Profession" value={profile.profession} />
          <Fact label="Education" value={profile.education} />
          <Fact
            label="Income"
            value={formatIncomeForCountry(
              profile.annualIncomeAmount,
              profile.incomeCurrency,
              profile.hideIncome,
            )}
          />
          <Fact label="Religion" value={profile.religion} />
          <Fact label="Marital status" value={labelForOption(maritalStatusOptions, profile.maritalStatus)} />
          <Fact label="Diet" value={labelForOption(dietOptions, profile.diet)} />
          <Fact label="Smoking" value={labelForOption(habitOptions, profile.smoking)} />
          <Fact label="Drinking" value={labelForOption(habitOptions, profile.drinking)} />
          <Fact label="Children" value={labelForOption(hasChildrenOptions, profile.hasChildren)} />
          <Fact label="Wants children" value={labelForOption(wantsChildrenOptions, profile.wantsChildren)} />
          <Fact label="Languages" value={profile.languagesSpoken.join(", ")} />
          {profile.motherTongue ? <Fact label="Mother tongue" value={profile.motherTongue} /> : null}
          {profile.familyType ? (
            <Fact label="Family type" value={labelForOption(familyTypeOptions, profile.familyType)} />
          ) : null}
          {profile.community ? <Fact label="Community" value={profile.community} /> : null}
          {profile.isManglik ? <Fact label="Manglik" value={labelForOption(manglikOptions, profile.isManglik)} /> : null}
          {profile.isOnlyChild !== null ? (
            <Fact label="Only child" value={profile.isOnlyChild ? "Yes" : "Has siblings"} />
          ) : null}
          {profile.ethnicity && profile.ethnicity !== "prefer_not_to_say" ? (
            <Fact label="Ethnicity" value={profile.ethnicity} />
          ) : null}
        </dl>

        {preference ? (
          <div className="rounded-xl bg-muted p-4">
            <h2 className="mb-2 font-semibold">What they are looking for</h2>
            <p>
              Ages {preference.minAge}–{preference.maxAge}, height{" "}
              {formatHeightFromCentimeters(preference.minHeightCm, viewerCatalog.heightDisplayUnit)}–
              {formatHeightFromCentimeters(preference.maxHeightCm, viewerCatalog.heightDisplayUnit)}
            </p>
            {preference.countries.length > 0 ? <p>Countries: {preference.countries.join(", ")}</p> : null}
            {preference.religions.length > 0 ? <p>Religions: {preference.religions.join(", ")}</p> : null}
            {preference.educationBands.length > 0 ? (
              <p>
                Education:{" "}
                {preference.educationBands
                  .map((band) => labelForOption(educationBandOptions, band))
                  .join(", ")}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
