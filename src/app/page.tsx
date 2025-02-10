import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const mockImageUrls = [
  "https://x875l9ua6a.ufs.sh/f/nuh7nR4ojvMmQ1n2BHuGLIyRi71Wv8XzknuBYPbfhj2HKrwD",
  "https://x875l9ua6a.ufs.sh/f/nuh7nR4ojvMmHiWnt6JCDf5U7MWaFeVcpj9NqdYm43QORw1s",
  "https://x875l9ua6a.ufs.sh/f/nuh7nR4ojvMmTOjXTxKL0ejI1kOySwYis94PnQvd6c5gVKfZ",
  "https://x875l9ua6a.ufs.sh/f/nuh7nR4ojvMmcUrFRxZNTp1FhK2OQYufMUWBtzsgEqeL68Rd",
];

const mockImages = mockImageUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  console.log(posts);

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {[...mockImages, ...mockImages].map((image, index) => (
          <div key={index} className="w-48">
            <img src={image.url} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </main>
  );
}
