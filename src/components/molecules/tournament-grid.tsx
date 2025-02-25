import { Tournament } from "~/types/tournaments";
import { TournamentTile } from "./tournament-tile";

interface ITournamentGridProps {
  tournaments: Tournament[];
  isAdmin?: boolean;
}

export function TournamentGrid({
  tournaments,
  isAdmin = false,
}: ITournamentGridProps) {
  if (tournaments.length === 0) {
    return (
      <div className="rounded border border-slate-200 bg-slate-50 p-4 text-center text-slate-500">
        No tournaments found
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {tournaments.map((tournament: Tournament) => (
        <TournamentTile
          key={tournament.id}
          tournament={tournament}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
}
