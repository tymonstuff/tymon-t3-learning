import { db } from "~/server/db";
import { CreateTournamentDialog } from "~/components/molecules/create-tournament-dialog";
import { TournamentGrid } from "~/components/molecules/tournament-grid";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const tournaments = await db.query.tournaments.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
  });

  return (
    <main className="space-y-6">
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <h2 className="mb-4 text-lg font-semibold">Admin Controls</h2>
        <CreateTournamentDialog />
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <h2 className="mb-4 text-lg font-semibold">All Tournaments</h2>
        {tournaments.length > 0 ? (
          <TournamentGrid tournaments={tournaments} />
        ) : (
          <p className="text-slate-500">No tournaments created yet.</p>
        )}
      </div>
    </main>
  );
}
