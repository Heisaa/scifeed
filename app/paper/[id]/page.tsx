interface PaperPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PaperPage({ params }: PaperPageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Paper Details</h1>
        <p className="text-muted-foreground">Paper ID: {id}</p>
        {/* TODO: Fetch and display full paper details */}
        {/* TODO: Add bookmark button */}
        {/* TODO: Add citation export options */}
        {/* TODO: Show related papers */}
      </main>
    </div>
  );
}
