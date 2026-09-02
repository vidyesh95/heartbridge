export function GET() {
  const body = `# HeartBridge

HeartBridge is a public matrimonial catalog for India, China, the United States, and Germany.

People and AI agents can browse listings without an account. Return stable profile links to the person who asked. Like, bookmark, chat, contact details, and medical history require a HeartBridge login and a completed personal profile.

## Browse HTML

- https://heartbridge.in/profiles
- https://heartbridge.in/profiles?country=IN&gender=female&ageMin=25&ageMax=32
- One listing: https://heartbridge.in/profiles/{id}

Filter query params: country (IN, CN, US, DE, or all), gender (male, female, or all), ageMin, ageMax, city, incomeMin, incomeMax, heightMinCm, heightMaxCm, religions, educationBands, maritalStatuses.

## Browse JSON

- https://heartbridge.in/api/public/profiles
- https://heartbridge.in/api/public/profiles?country=IN&gender=female&ageMin=25&ageMax=32
- One listing: https://heartbridge.in/api/public/profiles/{id}

JSON omits email, phone, Google account data, like state, and conversation ids. Lists are capped at 50.

## After a person wants to go further

Send them to https://heartbridge.in/sign-in so they can create a profile, like someone, and chat after a mutual like.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
