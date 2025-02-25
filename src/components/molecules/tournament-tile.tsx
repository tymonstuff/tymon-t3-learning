"use client";

import { Button } from "../ui/button";
import { deleteTournament } from "~/app/actions/deleteTournament";
import { useState } from "react";
import Link from "next/link";
import { Tournament } from "~/types/tournaments";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

interface ITournamentTileProps {
  tournament: Tournament;
  isAdmin?: boolean;
}

export function TournamentTile({
  tournament,
  isAdmin = false,
}: ITournamentTileProps) {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    setConfirmDialogOpen(true);
  };

  async function handleConfirmDelete() {
    try {
      setIsDeleting(true);
      await deleteTournament(tournament.id);
      setConfirmDialogOpen(false);
    } catch (error) {
      console.error("Error deleting tournament:", error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="flex flex-col gap-2 rounded border border-slate-200 bg-slate-50 p-4">
      <h3 className="text-lg font-medium">{tournament.name}</h3>
      <p>{`Rounds: ${tournament.rounds}`}</p>
      <p>{`Tables: ${tournament.tables}`}</p>

      {isAdmin && (
        <>
          <p className="font-mono text-xs">{tournament.id}</p>
          <p>{`Created: ${tournament.createdAt.toDateString()}`}</p>
        </>
      )}

      <div className="mt-2 flex gap-2">
        <Link href={`/tournament/${tournament.id}`} className="flex-1">
          <Button className="w-full" variant="outline">
            {isAdmin ? "Manage" : "View"}
          </Button>
        </Link>

        {isAdmin && (
          <Button
            variant="destructive"
            onClick={handleDeleteClick}
            className="flex-1"
          >
            Delete
          </Button>
        )}
      </div>

      {isAdmin && (
        <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Tournament</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the tournament "
                {tournament.name}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setConfirmDialogOpen(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
