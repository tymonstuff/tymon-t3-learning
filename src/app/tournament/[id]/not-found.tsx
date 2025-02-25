import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function TournamentNotFound() {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <Link href="/">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-slate-50 p-10 text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Tournament Not Found
          </h1>
          <p className="mt-4 max-w-md text-slate-500">
            The tournament you're looking for doesn't exist or may have been
            deleted.
          </p>
          <Link href="/" className="mt-6">
            <Button>Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
