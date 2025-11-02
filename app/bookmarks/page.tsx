export default function BookmarksPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Saved Papers</h1>
        <p className="text-muted-foreground mb-6">
          Your bookmarked research papers
        </p>
        {/* TODO: Fetch and display user's bookmarked papers */}
        {/* TODO: Add filtering and sorting options */}
        {/* TODO: Add collections/folders (future) */}
      </main>
    </div>
  );
}
