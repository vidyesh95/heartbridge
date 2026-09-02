import { PUBLIC_AVAILABLE_FILTERS, PUBLIC_LISTING_LIMIT } from "@/domain/profile/public-listing";

export function GET() {
  const body = `# HeartBridge

HeartBridge is a public matrimonial catalog for India, China, the United States, and Germany.

People and AI agents can browse listings without an account. Return stable profile links to the person who asked. Like, bookmark, chat, contact details, and medical history require a HeartBridge login and a completed personal profile.

People open Filters next to the HeartBridge logo and again on the browse page. Agents should prefer the query string on the HTML page or the JSON API. The same params work on both.

## Browse HTML

- https://heartbridge.in/profiles
- https://heartbridge.in/profiles?country=IN&gender=female&ageMin=25&ageMax=32
- One listing: https://heartbridge.in/profiles/{id}

## Browse JSON

- https://heartbridge.in/api/public/profiles
- https://heartbridge.in/api/public/profiles?country=IN&gender=female&ageMin=25&ageMax=32
- One listing: https://heartbridge.in/api/public/profiles/{id}

JSON omits email, phone, Google account data, like state, and conversation ids. Lists are capped at ${PUBLIC_LISTING_LIMIT}. Each list response echoes appliedFilters and availableFilters.

## Filter query params

Same names on /profiles and /api/public/profiles. Country and gender are case-insensitive. List params accept commas or repeated keys (religions=Hindu,Sikh or religions=Hindu&religions=Sikh). Religion, education, and marital status match case-insensitively. city and region match either the city or the state/region (so city=Maharashtra or region=Goa both work). incomeMin and incomeMax apply only when one country is selected.

- country: ${PUBLIC_AVAILABLE_FILTERS.country.join(", ")}
- gender: ${PUBLIC_AVAILABLE_FILTERS.gender.join(", ")}
- educationBands: ${PUBLIC_AVAILABLE_FILTERS.educationBands.join(", ")}
- maritalStatuses: ${PUBLIC_AVAILABLE_FILTERS.maritalStatuses.join(", ")}
- religions: ${PUBLIC_AVAILABLE_FILTERS.religions.join(", ")}
- ranges: ${PUBLIC_AVAILABLE_FILTERS.ranges.join(", ")}

## After a person wants to go further

Send them to https://heartbridge.in/sign-in so they can create a profile, like someone, and chat after a mutual like.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
