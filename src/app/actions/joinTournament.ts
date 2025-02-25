"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "~/server/db";
import { players, tournaments } from "~/server/db/schema";
import { eq, and } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { validate as uuidValidate } from "uuid";

const joinTournamentSchema = z.object({
  tournamentId: z.string().refine((val) => uuidValidate(val), {
    message: "Invalid tournament ID format",
  }),
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
});

export async function joinTournament(formData: FormData): Promise<{
  success: boolean;
  message: string;
  tournamentId?: string;
}> {
  const user = await currentUser();

  if (!user) {
    return {
      success: false,
      message: "You must be logged in to join a tournament",
    };
  }

  try {
    const formDataObject = Object.fromEntries(formData);

    // Validate form data
    const { tournamentId, displayName } =
      joinTournamentSchema.parse(formDataObject);

    // Check if tournament exists
    const tournament = await db.query.tournaments.findFirst({
      where: eq(tournaments.id, tournamentId),
    });

    if (!tournament) {
      return { success: false, message: "Tournament not found" };
    }

    // Check if user is already in this tournament
    const existingPlayer = await db.query.players.findFirst({
      where: and(
        eq(players.userId, user.id),
        eq(players.tournamentId, tournamentId),
      ),
    });

    if (existingPlayer) {
      return {
        success: true,
        message: "You are already registered in this tournament",
        tournamentId,
      };
    }

    // Add player to tournament
    await db.insert(players).values({
      userId: user.id,
      tournamentId,
      displayName,
      isAdmin: false, // Regular users are not admins by default
    });

    revalidatePath(`/tournament/${tournamentId}`);
    revalidatePath("/");

    return {
      success: true,
      message: "Successfully joined tournament",
      tournamentId,
    };
  } catch (error: unknown) {
    console.error("Failed to join tournament:", error);

    if (error instanceof z.ZodError && error.errors.length > 0) {
      return {
        success: false,
        message: error.errors[0]?.message || "Validation error",
      };
    }

    return {
      success: false,
      message: "Failed to join tournament. Please try again.",
    };
  }
}
