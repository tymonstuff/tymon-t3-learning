export default function HomePage() {
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

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {[...mockImages, ...mockImages].map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </main>
  );
}
