import { AdminReportsAndVerification } from "@/components/admin/admin-reports-and-verification";
import { AdminUsersTable } from "@/components/admin/admin-users-table";

export default function AdminPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 pt-20 pb-10">
      <div>
        <h1 className="text-2xl font-semibold">Admin</h1>
        <p className="text-sm text-muted-foreground">
          Manage HeartBridge users, bans, reports, and verification badges.
        </p>
      </div>
      <AdminUsersTable />
      <AdminReportsAndVerification />
    </main>
  );
}
