-- HeartBridge matrimonial tables (SQLite / Turso).
-- Better Auth already owns: user, session, account, verification, rateLimit.
-- Apply with: pnpm db:migrate
--
-- Heights are always stored in centimeters. Income is always an integer plus a currency code.
-- Age is never stored; compute it from date_of_birth.

CREATE TABLE IF NOT EXISTS matrimonial_profile (
  -- Same id as Better Auth user.id. One matrimonial profile per account.
  user_id TEXT PRIMARY KEY NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,

  -- Name shown on cards and the profile page. Defaults to the Google account name.
  display_name TEXT NOT NULL,

  -- Where this person lives and which country catalog (currency, units, optional fields) to use.
  -- IN = India, CN = China, US = United States, DE = Germany.
  country TEXT NOT NULL CHECK (country IN ('IN', 'CN', 'US', 'DE')),

  -- The member's own gender. Used for browse filters and "seeking" matching.
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female')),

  -- The gender this member wants to meet. Browse hides people who do not match both sides.
  seeking_gender TEXT NOT NULL CHECK (seeking_gender IN ('male', 'female')),

  -- ISO date YYYY-MM-DD. Age = years since this date. Must be 18+.
  date_of_birth TEXT NOT NULL,

  -- Height in centimeters. Convert to ft/in for India and the US in the UI.
  height_cm INTEGER NOT NULL,

  -- City shown on cards ("Mumbai", "Berlin"). Filterable.
  city TEXT NOT NULL,

  -- State / province / Bundesland. Shown next to city.
  region TEXT NOT NULL,

  -- Religion label from the country catalog. "prefer_not_to_say" and "none" are valid.
  religion TEXT NOT NULL,

  -- Human-readable degree as the member typed or selected (B.Tech, MBA, PhD).
  education TEXT NOT NULL,

  -- Coarse band used by search filters: high_school, diploma, bachelors, masters, doctorate, other.
  education_band TEXT NOT NULL,

  -- Job title shown on cards.
  profession TEXT NOT NULL,

  -- Yearly income as a whole number in income_currency. Hide when hide_income = 1.
  annual_income_amount INTEGER NOT NULL,

  -- ISO currency matching the profile country: INR, CNY, USD, EUR.
  income_currency TEXT NOT NULL CHECK (income_currency IN ('INR', 'CNY', 'USD', 'EUR')),

  -- never_married | divorced | widowed | separated
  marital_status TEXT NOT NULL,

  -- vegetarian | eggetarian | non_vegetarian | vegan | no_preference
  diet TEXT NOT NULL,

  -- never | occasionally | regularly | prefer_not_to_say
  smoking TEXT NOT NULL,

  -- never | occasionally | regularly | prefer_not_to_say
  drinking TEXT NOT NULL,

  -- Free-text bio shown on the profile detail page.
  about_me TEXT NOT NULL,

  -- India: first language at home. Optional elsewhere.
  mother_tongue TEXT,

  -- India: optional community. Never required. Hidden unless the member fills it.
  community TEXT,

  -- India: nuclear | joint. Null for other countries.
  family_type TEXT,

  -- China: 1 = only child, 0 = has siblings, null = not asked.
  is_only_child INTEGER,

  -- none | has_children
  has_children TEXT NOT NULL,

  -- yes | no | open
  wants_children TEXT NOT NULL,

  -- JSON string array of language codes/names the person speaks. Example: ["English","Hindi"]
  languages_spoken TEXT NOT NULL,

  -- United States: optional ethnicity. Default prefer_not_to_say.
  ethnicity TEXT,

  -- India: yes | no | unknown. Stored only; we do not run horoscope matching.
  is_manglik TEXT,

  -- Public path (/profile1.avif) or a Google avatar URL.
  photo_path TEXT NOT NULL,

  -- 1 hides annual income on cards and the public profile.
  hide_income INTEGER NOT NULL DEFAULT 0,

  -- Who can see the photo: everyone | likes_only | matches_only
  photos_visible_to TEXT NOT NULL DEFAULT 'everyone',

  -- 1 hides this profile from browse until the member unpauses.
  is_paused INTEGER NOT NULL DEFAULT 0,

  -- 1 shows a "Verified" badge. Seeded profiles are verified. Admins can toggle this.
  is_verified INTEGER NOT NULL DEFAULT 0,

  -- ISO timestamp when the member accepted privacy terms. Required before a German profile is saved.
  privacy_consent_at TEXT,

  -- Seed-only: when a real member likes this profile, create a like back so they can message.
  seed_will_reciprocate_likes INTEGER NOT NULL DEFAULT 0,

  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS matrimonial_profile_country_idx ON matrimonial_profile (country);
CREATE INDEX IF NOT EXISTS matrimonial_profile_gender_idx ON matrimonial_profile (gender);
CREATE INDEX IF NOT EXISTS matrimonial_profile_city_idx ON matrimonial_profile (city);
CREATE INDEX IF NOT EXISTS matrimonial_profile_paused_idx ON matrimonial_profile (is_paused);

-- What this member is looking for. Empty JSON arrays mean "no preference / do not filter".
CREATE TABLE IF NOT EXISTS partner_preference (
  user_id TEXT PRIMARY KEY NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
  min_age INTEGER NOT NULL DEFAULT 21,
  max_age INTEGER NOT NULL DEFAULT 40,
  min_height_cm INTEGER NOT NULL DEFAULT 140,
  max_height_cm INTEGER NOT NULL DEFAULT 200,
  -- JSON arrays of catalog values. [] means any.
  countries TEXT NOT NULL DEFAULT '[]',
  religions TEXT NOT NULL DEFAULT '[]',
  education_bands TEXT NOT NULL DEFAULT '[]',
  marital_statuses TEXT NOT NULL DEFAULT '[]',
  diets TEXT NOT NULL DEFAULT '[]',
  min_income_amount INTEGER,
  min_income_currency TEXT,
  updated_at TEXT NOT NULL
);

-- A like is one-way. Two rows (A→B and B→A) are a match and unlock messaging.
CREATE TABLE IF NOT EXISTS profile_like (
  liker_user_id TEXT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
  liked_user_id TEXT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
  created_at TEXT NOT NULL,
  PRIMARY KEY (liker_user_id, liked_user_id)
);

CREATE INDEX IF NOT EXISTS profile_like_liked_idx ON profile_like (liked_user_id);

CREATE TABLE IF NOT EXISTS profile_bookmark (
  bookmarker_user_id TEXT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
  bookmarked_user_id TEXT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
  created_at TEXT NOT NULL,
  PRIMARY KEY (bookmarker_user_id, bookmarked_user_id)
);

-- Either direction hides both people from each other's browse, likes, and inbox.
CREATE TABLE IF NOT EXISTS profile_block (
  blocker_user_id TEXT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
  blocked_user_id TEXT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
  created_at TEXT NOT NULL,
  PRIMARY KEY (blocker_user_id, blocked_user_id)
);

CREATE TABLE IF NOT EXISTS profile_report (
  id TEXT PRIMARY KEY NOT NULL,
  reporter_user_id TEXT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
  reported_user_id TEXT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
  reason TEXT NOT NULL,
  details TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS profile_report_created_idx ON profile_report (created_at);

-- Created the first time two people like each other. member_a_id is the lexicographically smaller user id.
CREATE TABLE IF NOT EXISTS conversation (
  id TEXT PRIMARY KEY NOT NULL,
  member_a_id TEXT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
  member_b_id TEXT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
  created_at TEXT NOT NULL,
  UNIQUE (member_a_id, member_b_id)
);

CREATE TABLE IF NOT EXISTS message (
  id TEXT PRIMARY KEY NOT NULL,
  conversation_id TEXT NOT NULL REFERENCES conversation (id) ON DELETE CASCADE,
  sender_user_id TEXT NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_at TEXT NOT NULL,
  read_at TEXT
);

CREATE INDEX IF NOT EXISTS message_conversation_idx ON message (conversation_id, created_at);

-- Contact page submissions. No email send; staff read these in admin.
CREATE TABLE IF NOT EXISTS contact_message (
  id TEXT PRIMARY KEY NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TEXT NOT NULL
);
