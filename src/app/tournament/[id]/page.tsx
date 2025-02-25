import { notFound } from "next/navigation";
import { db } from "~/server/db";
import { tournaments, players } from "~/server/db/schema";
import { eq, and, asc } from "drizzle-orm";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ArrowLeft, Users } from "lucide-react";
import { validate as uuidValidate } from "uuid";
import { isAdmin } from "~/lib/auth";
import { currentUser } from "@clerk/nextjs/server";
import { type Player } from "~/types/tournaments";

interface TournamentPageProps {
  params: {
    id: string;
  };
}

export default async function TournamentPage({ params }: TournamentPageProps) {
  const { id } = params;
  const user = await currentUser();
  const userIsAdmin = await isAdmin();

  // Validate UUID format using uuid package
  if (!uuidValidate(id)) {
    notFound();
  }

  try {
    // Get tournament details
    const tournament = await db.query.tournaments.findFirst({
      where: eq(tournaments.id, id),
    });

    if (!tournament) {
      notFound();
    }

    // Get all players in this tournament
    const tournamentPlayers = (await db
      .select()
      .from(players)
      .where(eq(players.tournamentId, id))
      .orderBy(asc(players.joinedAt))) as Player[];

    // Check if current user is a player in this tournament
    let isUserPlayer = false;
    if (user) {
      const playerRecord = tournamentPlayers.find(
        (player) => player.userId === user.id,
      );
      isUserPlayer = !!playerRecord;
    }

    // If user is not an admin and not a player, they shouldn't see tournament details
    if (!userIsAdmin && !isUserPlayer) {
      return (
        <main className="min-h-screen p-6">
          <div className="mx-auto max-w-3xl space-y-6">
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-center">
              <h1 className="mb-4 text-2xl font-bold text-slate-800">
                Tournament Access Restricted
              </h1>
              <p className="mb-6 text-slate-600">
                You need to join this tournament to view its details.
              </p>
              <Link href="/">
                <Button>Go to Dashboard</Button>
              </Link>
            </div>
          </div>
        </main>
      );
    }

    return (
      <main className="min-h-screen p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>

          {userIsAdmin ? (
            // Admin view
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">{tournament.name}</h1>
                <div className="rounded bg-blue-100 px-3 py-1 text-sm text-blue-800">
                  Admin View
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2 rounded-md border border-slate-200 bg-white p-4">
                  <h2 className="text-sm font-medium text-slate-500">
                    Tournament ID
                  </h2>
                  <p className="font-mono text-sm">{tournament.id}</p>
                </div>

                <div className="space-y-2 rounded-md border border-slate-200 bg-white p-4">
                  <h2 className="text-sm font-medium text-slate-500">
                    Created
                  </h2>
                  <p>{tournament.createdAt.toLocaleString()}</p>
                </div>

                <div className="space-y-2 rounded-md border border-slate-200 bg-white p-4">
                  <h2 className="text-sm font-medium text-slate-500">
                    Number of Rounds
                  </h2>
                  <p className="text-2xl font-bold">{tournament.rounds}</p>
                </div>

                <div className="space-y-2 rounded-md border border-slate-200 bg-white p-4">
                  <h2 className="text-sm font-medium text-slate-500">
                    Number of Tables
                  </h2>
                  <p className="text-2xl font-bold">{tournament.tables}</p>
                </div>

                <div className="space-y-2 rounded-md border border-slate-200 bg-white p-4">
                  <h2 className="text-sm font-medium text-slate-500">
                    Players Joined
                  </h2>
                  <p className="text-2xl font-bold">
                    {tournamentPlayers.length}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="mb-4 text-xl font-semibold">
                  Tournament Management
                </h2>
                <div className="flex flex-wrap gap-3">
                  <Button variant="default">Start Tournament</Button>
                  <Button variant="outline">Manage Players</Button>
                  <Button variant="outline">Set Up Tables</Button>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="mb-4 text-xl font-semibold">
                  Player List ({tournamentPlayers.length})
                </h2>
                <div className="rounded-md border border-slate-200 bg-white">
                  {tournamentPlayers.length > 0 ? (
                    <ul className="divide-y divide-slate-200">
                      {tournamentPlayers.map((player) => (
                        <li
                          key={player.id}
                          className="flex items-center justify-between p-4"
                        >
                          <div>
                            <p className="font-medium">{player.displayName}</p>
                            <p className="text-xs text-slate-500">
                              Joined {player.joinedAt.toLocaleString()}
                            </p>
                          </div>
                          {player.isAdmin && (
                            <span className="rounded bg-amber-100 px-2 py-1 text-xs text-amber-800">
                              Admin
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="p-4 text-center text-slate-500">
                      No players have joined this tournament yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            // Player view (non-admin)
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <h1 className="mb-6 text-2xl font-bold">{tournament.name}</h1>

              <div className="mb-6 flex items-center gap-3 rounded-md border border-slate-200 bg-white p-4">
                <Users className="h-6 w-6 text-slate-400" />
                <div>
                  <h2 className="font-medium">Players</h2>
                  <p className="text-2xl font-bold">
                    {tournamentPlayers.length}
                  </p>
                </div>
              </div>

              <div className="rounded-md border border-slate-200 bg-white">
                <h2 className="border-b border-slate-200 p-4 font-medium">
                  Participants
                </h2>
                {tournamentPlayers.length > 0 ? (
                  <ul className="divide-y divide-slate-200">
                    {tournamentPlayers.map((player) => (
                      <li
                        key={player.id}
                        className={`flex items-center justify-between p-4 ${
                          user && player.userId === user.id ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-600">
                            {player.displayName.charAt(0).toUpperCase()}
                          </span>
                          <p className="font-medium">
                            {player.displayName}
                            {user && player.userId === user.id && " (You)"}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="p-4 text-center text-slate-500">
                    No players have joined this tournament yet.
                  </p>
                )}
              </div>

              <div className="mt-8 rounded-md border border-slate-200 bg-white p-4">
                <h2 className="mb-2 text-lg font-semibold">
                  Tournament Status
                </h2>
                <p className="text-slate-600">
                  This tournament has not started yet. The tournament organizer
                  will notify you when it begins.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    );
  } catch (error) {
    // Handle database errors by showing not-found page
    console.error("Error fetching tournament:", error);
    notFound();
  }
}
