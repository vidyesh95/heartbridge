import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@libsql/client";
import { loadEnvFileForScripts } from "./load-env-file-for-scripts";

loadEnvFileForScripts();

/**
 * Creates HeartBridge matrimonial tables on the same Turso database Better Auth uses.
 * Safe to run more than once: every statement is IF NOT EXISTS.
 */
function loadTursoUrl() {
  const url = process.env.TURSO_DATABASE_URL;
  if (!url) {
    throw new Error("TURSO_DATABASE_URL is not set. Add it to .env before migrating.");
  }
  return url;
}

function sqlStatementsFromSchemaFile(schemaSql: string) {
  const withoutBlockNoise = schemaSql
    .split("\n")
    .filter((line) => !line.trim().startsWith("--"))
    .join("\n");

  return withoutBlockNoise
    .split(";")
    .map((statement) => statement.trim())
    .filter((statement) => statement.length > 0);
}

async function migrateMatrimonialTables() {
  const schemaPath = join(dirname(fileURLToPath(import.meta.url)), "matrimonial-schema.sql");
  const schemaSql = readFileSync(schemaPath, "utf8");
  const statements = sqlStatementsFromSchemaFile(schemaSql);

  const client = createClient({
    url: loadTursoUrl(),
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  for (const statement of statements) {
    await client.execute(statement);
  }

  console.log(`Applied ${statements.length} matrimonial schema statements.`);
}

migrateMatrimonialTables().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
