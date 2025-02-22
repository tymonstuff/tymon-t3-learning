"use client";

import { Button } from "~/components/ui/button";
import { Clipboard } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { createTournament } from "../../app/actions/createTournament";
import { MIN_ROUND_COUNT, MIN_TABLE_COUNT } from "~/lib/constants";

interface ITournamentConfig {
  tournamentId: string;
  rounds: number;
  tables: number;
}

export function CreateTournamentDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [tournamentConfig, setTournamentConfig] = useState<ITournamentConfig>({
    tournamentId: uuidv4(),
    rounds: MIN_ROUND_COUNT,
    tables: MIN_TABLE_COUNT,
  });

  async function handleOnSubmit(formData: FormData) {
    await createTournament(formData);
    setDialogOpen(false);
  }

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setTournamentConfig((prev) => ({
        ...prev,
        tournamentId: uuidv4(),
      }));
    }
    setDialogOpen(open);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-fit">Create a new tournament</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Perudo Tournament</DialogTitle>
          <DialogDescription>
            Please provide the following details to create a new Perudo
            Tournament
          </DialogDescription>
        </DialogHeader>
        <form action={handleOnSubmit}>
          <div className="grid w-full items-center gap-3">
            <div>
              <Label htmlFor="game-round-total-input">Number of Rounds</Label>
              <Input
                name="rounds"
                type="number"
                id="game-round-total-input"
                min={MIN_ROUND_COUNT}
                placeholder={MIN_ROUND_COUNT.toString()}
                required
              />
            </div>
            <div>
              <Label htmlFor="game-table-total-input">Number of Tables</Label>
              <Input
                name="tables"
                type="number"
                id="game-table-total-input"
                min={MIN_TABLE_COUNT}
                placeholder={MIN_TABLE_COUNT.toString()}
                required
              />
            </div>
            <div>
              <Label>Tournament Code</Label>
              <div className="flex w-full gap-1">
                <Input
                  name="tournamentId"
                  type="text"
                  value={tournamentConfig.tournamentId}
                  readOnly
                />
                <Button variant="outline" size="icon">
                  <Clipboard />
                </Button>
              </div>
            </div>
            <Button type="submit">Create Tournament</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
