import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { JoinTournamentForm } from "~/components/molecules/join-tournament-form";
import { isAdmin } from "~/lib/auth";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const userIsAdmin = await isAdmin();

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Perudo Tournament System</h1>
          <div className="flex items-center gap-4">
            <SignedIn>
              {userIsAdmin && (
                <Link href="/admin">
                  <Button variant="outline">Admin Dashboard</Button>
                </Link>
              )}
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </div>
        </div>

        <SignedIn>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h2 className="mb-4 text-lg font-semibold">Join a Tournament</h2>
            <JoinTournamentForm />
          </div>

          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <h2 className="mb-2 text-lg font-semibold">How to Play</h2>
            <p className="text-slate-600">
              To join a tournament, you'll need the tournament code from your
              organizer. Enter the code above along with your display name to
              join the tournament.
            </p>
          </div>
        </SignedIn>
        <SignedOut>
          <div className="flex h-[400px] items-center justify-center rounded border border-slate-200 bg-slate-50">
            <div className="max-w-md text-center">
              <h2 className="mb-4 text-xl font-bold">
                Welcome to Perudo Tournament
              </h2>
              <p className="mb-6 text-slate-600">
                Sign in to join tournaments or create your own if you're an
                admin.
              </p>
              <SignInButton>
                <Button size="lg">Sign In</Button>
              </SignInButton>
            </div>
          </div>
        </SignedOut>
      </div>
    </main>
  );
}
