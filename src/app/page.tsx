import { SignedIn, SignedOut } from "@clerk/nextjs";

import { db } from "~/server/db";
import { CreateTournamentDialog } from "./_components/create-tournament-dialog";

export const dynamic = "force-dynamic";

// async function Images() {
//   const images = await db.query.images.findMany({
//     orderBy: (model, { desc }) => desc(model.id),
//   });

//   return (
//     <div className="flex flex-wrap gap-4">
//       {images.map((image, index) => (
//         <div key={index} className="flex w-48 flex-col">
//           <img src={image.url} className="h-full w-full object-cover" />
//           <div>{image.name}</div>
//         </div>
//       ))}
//     </div>
//   );
// }

export default async function HomePage() {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-xl font-bold">Perudo Admin Dashboard</h1>
        <CreateTournamentDialog />
      </div>
    </main>
  );
}
