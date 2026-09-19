import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/** Lets `pnpm db:migrate` and `pnpm db:seed` read `.env` without printing secrets. */
export function loadEnvFileForScripts() {
  const envPath = resolve(process.cwd(), ".env");
  let contents = "";
  try {
    contents = readFileSync(envPath, "utf8");
  } catch {
    return;
  }

  for (const rawLine of contents.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }
    const separator = line.indexOf("=");
    if (separator === -1) {
      continue;
    }
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.includes('"', 1)) ||
      (value.startsWith("'") && value.includes("'", 1))
    ) {
      const quoteChar = value[0];
      const closingQuote = value.indexOf(quoteChar, 1);
      if (closingQuote !== -1) {
        value = value.slice(1, closingQuote);
      }
    } else {
      const hashIndex = value.indexOf("#");
      if (hashIndex !== -1) {
        value = value.slice(0, hashIndex).trim();
      }
    }
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}
