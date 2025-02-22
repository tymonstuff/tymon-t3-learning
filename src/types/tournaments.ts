import { tournaments } from "~/server/db/schema";

export type Tournament = typeof tournaments.$inferSelect;
