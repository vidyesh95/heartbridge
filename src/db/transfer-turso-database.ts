import { createClient, type InStatement, type InValue } from "@libsql/client";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadTursoCredentials() {
  const envPath = resolve(process.cwd(), ".env");
  const envContent = readFileSync(envPath, "utf8");

  // Old credentials from commented lines
  const oldUrlMatch = envContent.match(/#\s*TURSO_DATABASE_URL="([^"]+)"/);
  const oldTokenMatch = envContent.match(/#\s*TURSO_AUTH_TOKEN="([^"]+)"/);

  // New credentials from active lines
  const newUrlMatch = envContent.match(/(?<!#\s*)TURSO_DATABASE_URL="([^"]+)"/);
  const newTokenMatch = envContent.match(/(?<!#\s*)TURSO_AUTH_TOKEN="([^"]+)"/);

  if (!oldUrlMatch || !oldTokenMatch) {
    throw new Error("Could not find commented old Turso credentials in .env");
  }
  if (!newUrlMatch || !newTokenMatch) {
    throw new Error("Could not find active new Turso credentials in .env");
  }

  return {
    oldDb: { url: oldUrlMatch[1], authToken: oldTokenMatch[1] },
    newDb: { url: newUrlMatch[1], authToken: newTokenMatch[1] },
  };
}

// Table order respecting foreign key constraints
const TABLE_ORDER = [
  "user",
  "account",
  "session",
  "verification",
  "rateLimit",
  "matrimonial_profile",
  "partner_preference",
  "profile_like",
  "profile_bookmark",
  "profile_block",
  "profile_report",
  "conversation",
  "message",
  "contact_message",
];

async function transferTursoDatabase() {
  const { oldDb, newDb } = loadTursoCredentials();

  console.log(`\nConnecting to Old Database: ${oldDb.url}`);
  const oldClient = createClient({ url: oldDb.url, authToken: oldDb.authToken });

  console.log(`Connecting to New Database: ${newDb.url}\n`);
  const newClient = createClient({ url: newDb.url, authToken: newDb.authToken });

  // 1. Fetch tables from old database
  const tablesMasterRes = await oldClient.execute(
    "SELECT name, sql FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_litestream%'"
  );

  const tableSqlMap = new Map<string, string>();
  for (const row of tablesMasterRes.rows) {
    if (row.name && row.sql) {
      tableSqlMap.set(String(row.name), String(row.sql));
    }
  }

  // Determine all tables to migrate (respecting TABLE_ORDER first, then any extra tables)
  const allTables = [
    ...TABLE_ORDER.filter((t) => tableSqlMap.has(t)),
    ...Array.from(tableSqlMap.keys()).filter((t) => !TABLE_ORDER.includes(t)),
  ];

  console.log(`Creating ${allTables.length} tables in new database...`);
  for (const tableName of allTables) {
    const tableSql = tableSqlMap.get(tableName);
    if (tableSql) {
      await newClient.execute(tableSql);
    }
  }

  // 2. Fetch and create indexes
  const indexesMasterRes = await oldClient.execute(
    "SELECT name, sql FROM sqlite_master WHERE type='index' AND sql IS NOT NULL AND name NOT LIKE 'sqlite_%'"
  );
  console.log(`Creating ${indexesMasterRes.rows.length} indexes in new database...`);
  for (const row of indexesMasterRes.rows) {
    if (row.sql) {
      try {
        await newClient.execute(String(row.sql));
      } catch (err: unknown) {
        // Ignore index already exists
        const msg = err instanceof Error ? err.message : String(err);
        if (!msg.includes("already exists")) {
          console.warn(`Index warning: ${msg}`);
        }
      }
    }
  }

  // 3. Transfer data table by table
  console.log("\nTransferring table rows...");
  const summary: Array<{ table: string; oldRows: number; newRows: number }> = [];

  for (const tableName of allTables) {
    const oldRowsRes = await oldClient.execute(`SELECT * FROM "${tableName}"`);
    const rows = oldRowsRes.rows;

    if (rows.length > 0) {
      const columns = Object.keys(rows[0]);
      const placeholders = columns.map(() => "?").join(", ");
      const insertSql = `INSERT OR IGNORE INTO "${tableName}" (${columns
        .map((c) => `"${c}"`)
        .join(", ")}) VALUES (${placeholders})`;

      const statements: InStatement[] = rows.map((row) => ({
        sql: insertSql,
        args: columns.map((col) => row[col] as InValue),
      }));

      // Batch in chunks of 50 to stay well under statement limits
      const chunkSize = 50;
      for (let i = 0; i < statements.length; i += chunkSize) {
        const chunk = statements.slice(i, i + chunkSize);
        await newClient.batch(chunk, "write");
      }
    }

    const newRowsRes = await newClient.execute(`SELECT COUNT(*) as count FROM "${tableName}"`);
    const newCount = Number(newRowsRes.rows[0].count);

    summary.push({
      table: tableName,
      oldRows: rows.length,
      newRows: newCount,
    });
  }

  // 4. Verify integrity
  console.log("\nVerifying Foreign Key Integrity...");
  const fkCheckRes = await newClient.execute("PRAGMA foreign_key_check;");
  if (fkCheckRes.rows.length > 0) {
    console.warn("⚠️ Foreign key check returned potential issues:", fkCheckRes.rows);
  } else {
    console.log("✅ Foreign key check passed with 0 violations.");
  }

  // 5. Print summary
  console.log("\n=== Data Migration Summary ===");
  console.table(summary);

  const allMatched = summary.every((s) => s.oldRows === s.newRows);
  if (allMatched) {
    console.log("\n🎉 SUCCESS: All tables and rows cloned perfectly to the new Turso database!");
  } else {
    console.warn("\n⚠️ Some tables have mismatched counts. Please check the summary above.");
  }
}

transferTursoDatabase().catch((err) => {
  console.error("\n❌ Migration failed:", err);
  process.exit(1);
});
