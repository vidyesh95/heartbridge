import { NextRequest, NextResponse } from "next/server";
import { getProfileByIdForViewer } from "@/db/queries/get-profile-by-id";
import { publicListingFromProfile, publicPreferenceFromPartner } from "@/domain/profile/public-listing";

export const runtime = "nodejs";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!process.env.TURSO_DATABASE_URL) {
    return NextResponse.json({ error: "Catalog is unavailable." }, { status: 503 });
  }

  const { id } = await params;
  const detail = await getProfileByIdForViewer(id);
  if (!detail || detail.profile.isPaused) {
    return NextResponse.json({ error: "Profile not found." }, { status: 404 });
  }

  return NextResponse.json({
    loginRequiredFor: ["like", "bookmark", "chat", "contactDetails", "medicalHistory"],
    profile: publicListingFromProfile(detail.profile, request.nextUrl.origin),
    lookingFor: publicPreferenceFromPartner(detail.preference),
  });
}
