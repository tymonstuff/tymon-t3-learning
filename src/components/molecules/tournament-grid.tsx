import { Tournament } from "~/types/tournaments";

interface ITournamentTileProps {
  tournament: Tournament;
}

function TournamentTile({ tournament }: ITournamentTileProps) {
  return (
    <div className="gap-2rounded flex flex-col border border-slate-600 p-4">
      <p>{tournament.id}</p>
      <p>{`Rounds: ${tournament.rounds}`}</p>
      <p>{`Tables: ${tournament.tables}`}</p>
      <p>{`Created: ${tournament.createdAt.toDateString()}`}</p>
    </div>
  );
}

interface ITournamentGridProps {
  tournaments: Tournament[];
}

export function TournamentGrid({ tournaments }: ITournamentGridProps) {
  return (
    <div className="flex flex-col gap-2">
      {tournaments.map((tournament: Tournament) => (
        <TournamentTile key={tournament.id} tournament={tournament} />
      ))}
    </div>
  );
}
