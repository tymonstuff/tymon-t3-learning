import { db } from "~/server/db";
import { CreateTournamentDialog } from "../components/molecules/create-tournament-dialog";
import { TournamentGrid } from "~/components/molecules/tournament-grid";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const tournaments = await db.query.tournaments.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
  });

  console.log(tournaments);

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-xl font-bold">Perudo Admin Dashboard</h1>
        <CreateTournamentDialog />
        <TournamentGrid tournaments={tournaments} />
      </div>
    </main>
  );
}
