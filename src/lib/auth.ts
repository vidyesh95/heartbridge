import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins/admin";
import { LibsqlDialect } from "@libsql/kysely-libsql";

const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

function createTursoDialect() {
  const url = process.env.TURSO_DATABASE_URL;
  if (!url) {
    throw new Error(
      "TURSO_DATABASE_URL is not set. Add Turso credentials to .env, then run `pnpm auth:migrate`.",
    );
  }
  return new LibsqlDialect({
    url,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
}

export const auth = betterAuth({
  appName: "HeartBridge",
  database: {
    dialect: createTursoDialect(),
    type: "sqlite",
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      prompt: "select_account",
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  rateLimit: {
    storage: "database",
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const isBootstrapAdmin = Boolean(adminEmail && user.email.toLowerCase() === adminEmail);
          return {
            data: {
              ...user,
              ...(isBootstrapAdmin ? { role: "admin" } : {}),
            },
          };
        },
      },
    },
  },
  plugins: [admin(), nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
