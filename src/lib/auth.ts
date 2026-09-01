import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins/admin";
import { LibsqlDialect } from "@libsql/kysely-libsql";

const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set. Add it to .env.`);
  }
  return value;
}

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

requireEnv("BETTER_AUTH_SECRET");
const googleClientId = requireEnv("GOOGLE_CLIENT_ID");
const googleClientSecret = requireEnv("GOOGLE_CLIENT_SECRET");

export const auth = betterAuth({
  appName: "HeartBridge",
  database: {
    dialect: createTursoDialect(),
    type: "sqlite",
  },
  trustedOrigins: [
    "http://localhost:3000",
    "https://heartbridge.in",
    "https://www.heartbridge.in",
  ],
  socialProviders: {
    google: {
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      prompt: "select_account",
    },
  },
  account: {
    encryptOAuthTokens: true,
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
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
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
    ipAddress: {
      ipAddressHeaders: ["x-forwarded-for"],
    },
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
