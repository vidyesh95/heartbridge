import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { isAdminRole } from "@/lib/auth-utils";

export { isAdminRole };

export async function getServerSession() {
  if (!process.env.TURSO_DATABASE_URL) {
    return null;
  }
  const { auth } = await import("@/lib/auth");
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireSession() {
  const session = await getServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireSession();
  if (!isAdminRole(session.user.role)) {
    redirect("/profiles");
  }
  return session;
}
