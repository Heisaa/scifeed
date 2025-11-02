export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">SciFeed</h1>
        <p className="text-muted-foreground mb-6">
          Your personalized research paper feed
        </p>
        {/* TODO: Add subject selection for first-time users */}
        {/* TODO: Add paper feed for users with preferences */}
      </main>
    </div>
  );
}
