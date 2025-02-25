"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "~/server/db";
import { tournaments } from "~/server/db/schema";
import { eq } from "drizzle-orm";

const deleteTournamentSchema = z.object({
  tournamentId: z.string().uuid(),
});

export async function deleteTournament(tournamentId: string): Promise<void> {
  try {
    // Validate the tournamentId
    const { tournamentId: validatedId } = deleteTournamentSchema.parse({
      tournamentId,
    });

    await db.delete(tournaments).where(eq(tournaments.id, validatedId));
  } catch (error) {
    console.error("Failed to delete tournament:", error);
    throw error;
  }

  revalidatePath("/");
}
