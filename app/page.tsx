"use client";

import { useEffect, useState } from "react";
import { SubjectSelection } from "@/components/subject-selection";
import { loadPreferences, savePreferences, type UserPreferences } from "@/lib/preferences";
import type { SubjectPreference } from "@/lib/subjects";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load preferences from localStorage on mount
    const prefs = loadPreferences();
    setPreferences(prefs);
    setIsLoading(false);
  }, []);

  const handleSubjectSelectionComplete = (subjects: SubjectPreference[]) => {
    const newPreferences: UserPreferences = {
      subjects,
      hasOnboarded: true,
    };
    savePreferences(newPreferences);
    setPreferences(newPreferences);
  };

  const handleChangePreferences = () => {
    setPreferences(null);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // Show subject selection if no preferences or not onboarded
  if (!preferences || !preferences.hasOnboarded || preferences.subjects.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <SubjectSelection
            onComplete={handleSubjectSelectionComplete}
            initialPreferences={preferences?.subjects}
          />
        </main>
      </div>
    );
  }

  // Show feed with user's preferences
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">SciFeed</h1>
            <p className="text-muted-foreground">
              Your personalized research paper feed
            </p>
          </div>
          <Button variant="outline" onClick={handleChangePreferences}>
            Change Subjects
          </Button>
        </div>

        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-2">Your interests:</p>
          <div className="flex flex-wrap gap-2">
            {preferences.subjects.map((pref) => (
              <span
                key={pref.subject}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {pref.subject}
              </span>
            ))}
          </div>
        </div>

        {/* TODO: Add paper feed component here */}
        <div className="border-2 border-dashed border-muted rounded-lg p-12 text-center">
          <p className="text-muted-foreground mb-2">Paper feed coming soon!</p>
          <p className="text-sm text-muted-foreground">
            We&apos;ll display the latest research papers based on your selected subjects
          </p>
        </div>
      </main>
    </div>
  );
}
