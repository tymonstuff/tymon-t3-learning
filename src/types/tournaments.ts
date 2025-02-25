import { players, tournaments } from "~/server/db/schema";

export type Tournament = typeof tournaments.$inferSelect;
export type Player = typeof players.$inferSelect;

export interface TournamentWithPlayerCount extends Tournament {
  playerCount: number;
}

export interface TournamentWithPlayers extends Tournament {
  players: Player[];
}
