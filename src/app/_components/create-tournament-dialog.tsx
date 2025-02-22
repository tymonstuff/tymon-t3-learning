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

interface ITournamentConfig {
  tournamentId: string;
  rounds: number | null;
  tables: number | null;
}

export function CreateTournamentDialog() {
  const [tournamentConfig, setTournamentConfig] = useState<ITournamentConfig>({
    tournamentId: uuidv4(),
    rounds: null,
    tables: null,
  });

  return (
    <Dialog>
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
        <div className="grid w-full items-center gap-3">
          <div>
            <Label htmlFor="game-round-total-input">Number of Rounds</Label>
            <Input
              type="number"
              id="game-round-total-input"
              min={1}
              placeholder="3"
            />
          </div>
          <div>
            <Label htmlFor="game-table-total-input">Number of Tables</Label>
            <Input
              type="number"
              id="game-table-total-input"
              min={1}
              placeholder="3"
            />
          </div>
          <div>
            <Label>Tournament Code</Label>
            <div className="flex w-full gap-1">
              <Input
                type="text"
                placeholder=""
                value={tournamentConfig.tournamentId}
                readOnly
              />
              <Button variant="outline" size="icon">
                <Clipboard />
              </Button>
            </div>
          </div>
        </div>
        <Button>Create Tournament</Button>
      </DialogContent>
    </Dialog>
  );
}
