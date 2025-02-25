"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "~/server/db";
import { tournaments } from "~/server/db/schema";

const createTournamentSchema = z.object({
  tournamentId: z.string().uuid(),
  name: z.string(),
  rounds: z.coerce.number().min(1),
  tables: z.coerce.number().min(1),
});

export async function createTournament(formData: FormData): Promise<void> {
  const tournamentConfigForm = Object.fromEntries(formData);

  const tournamentConfig = createTournamentSchema.parse(tournamentConfigForm);

  try {
    await db.insert(tournaments).values({
      id: tournamentConfig.tournamentId,
      name: tournamentConfig.name,
      rounds: tournamentConfig.rounds,
      tables: tournamentConfig.tables,
    });
  } catch (error) {
    console.error("Failed to create tournament:", error);
    throw error;
  }

  revalidatePath("/");
}
