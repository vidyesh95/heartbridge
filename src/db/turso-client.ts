import { createClient, type Client } from "@libsql/client";

/**
 * Shared Turso / libSQL client for matrimonial tables.
 * Better Auth keeps its own connection through Kysely; this client is for HeartBridge queries.
 */
let cachedClient: Client | null = null;

export function getTursoClient() {
  if (cachedClient) {
    return cachedClient;
  }

  const url = process.env.TURSO_DATABASE_URL;
  if (!url) {
    throw new Error(
      "TURSO_DATABASE_URL is not set. Add Turso credentials to .env, then run `pnpm db:migrate`.",
    );
  }

  cachedClient = createClient({
    url,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  return cachedClient;
}

export function nowAsIsoTimestamp() {
  return new Date().toISOString();
}

export function createRandomId(prefix: string) {
  return `${prefix}_${crypto.randomUUID()}`;
}

export function parseJsonStringArray(value: string | null | undefined): string[] {
  if (!value) {
    return [];
  }
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export function toSqliteBoolean(value: boolean | null | undefined) {
  if (value === null || value === undefined) {
    return null;
  }
  return value ? 1 : 0;
}

export function fromSqliteBoolean(value: number | null | undefined) {
  return value === 1;
}
