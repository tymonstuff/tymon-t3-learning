// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  integer,
  pgTableCreator,
  timestamp,
  uuid,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `tymon-perudo_${name}`);

export const tournaments = createTable("tournaments", {
  id: uuid("tournamentId").primaryKey(),
  name: varchar("name").notNull(),
  rounds: integer("rounds").notNull(),
  tables: integer("tables").notNull(),
  currentRound: integer("current_round").default(0).notNull(),
  status: varchar("status", { length: 20 }).default("created").notNull(), // created, active, completed
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const players = createTable("players", {
  id: uuid("playerId").primaryKey().defaultRandom(),
  userId: varchar("user_id").notNull(), // Clerk user ID
  tournamentId: uuid("tournament_id")
    .notNull()
    .references(() => tournaments.id, { onDelete: "cascade" }),
  displayName: varchar("display_name").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  joinedAt: timestamp("joined_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

// Relations
export const tournamentsRelations = relations(tournaments, ({ many }) => ({
  players: many(players),
}));

export const playersRelations = relations(players, ({ one }) => ({
  tournament: one(tournaments, {
    fields: [players.tournamentId],
    references: [tournaments.id],
  }),
}));
