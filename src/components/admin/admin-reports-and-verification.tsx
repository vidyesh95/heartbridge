import { adminToggleProfileVerifiedFromForm } from "@/app/actions/inbox-and-settings-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listProfileReportsForAdmin } from "@/db/queries/block-and-report-profile";
import { getTursoClient } from "@/db/turso-client";
import { labelForOption, reportReasonOptions } from "@/domain/countries/shared-profile-options";

export async function AdminReportsAndVerification() {
  const reports = await listProfileReportsForAdmin();
  const client = getTursoClient();
  const [profiles, contacts] = await Promise.all([
    client.execute({
      sql: `
        SELECT user_id, display_name, country, is_verified, is_paused
        FROM matrimonial_profile
        ORDER BY created_at DESC
        LIMIT 40
      `,
    }),
    client.execute({
      sql: "SELECT * FROM contact_message ORDER BY created_at DESC LIMIT 20",
    }),
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile reports</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {reports.length === 0 ? (
            <p className="text-sm text-muted-foreground">No reports yet.</p>
          ) : (
            reports.map((report) => (
              <div key={report.id} className="rounded-lg border p-3 text-sm">
                <p>
                  <strong>{report.reporterName}</strong> reported{" "}
                  <strong>{report.reportedName}</strong> for{" "}
                  {labelForOption(reportReasonOptions, report.reason)}
                </p>
                {report.details ? <p className="text-muted-foreground">{report.details}</p> : null}
                <p className="text-xs text-muted-foreground">
                  {new Date(report.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact form messages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {contacts.rows.length === 0 ? (
            <p className="text-sm text-muted-foreground">No contact messages yet.</p>
          ) : (
            contacts.rows.map((row) => (
              <div key={String(row.id)} className="rounded-lg border p-3 text-sm">
                <p className="font-medium">
                  {String(row.first_name)} {String(row.last_name)} · {String(row.email)}
                </p>
                <p>{String(row.subject)}</p>
                <p className="text-muted-foreground">{String(row.body)}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Verification badges</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {profiles.rows.map((row) => {
            const userId = String(row.user_id);
            const verified = Number(row.is_verified) === 1;
            return (
              <form
                key={userId}
                className="flex items-center justify-between gap-3 text-sm"
                action={adminToggleProfileVerifiedFromForm}
              >
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="nextVerified" value={verified ? "0" : "1"} />
                <div>
                  <p className="font-medium">{String(row.display_name)}</p>
                  <p className="text-muted-foreground">
                    {String(row.country)}
                    {Number(row.is_paused) === 1 ? " · paused" : ""}
                    {verified ? " · verified" : " · not verified"}
                  </p>
                </div>
                <Button type="submit" variant="outline" size="sm">
                  {verified ? "Remove verified" : "Mark verified"}
                </Button>
              </form>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
