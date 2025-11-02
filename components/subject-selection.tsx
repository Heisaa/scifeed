"use client";

import { useState } from "react";
import { RESEARCH_SUBJECTS, type SubjectPreference } from "@/lib/subjects";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface SubjectSelectionProps {
  onComplete: (preferences: SubjectPreference[]) => void;
  initialPreferences?: SubjectPreference[];
}

export function SubjectSelection({ onComplete, initialPreferences = [] }: SubjectSelectionProps) {
  const [selectedSubjects, setSelectedSubjects] = useState<Set<string>>(
    new Set(initialPreferences.map((p) => p.subject))
  );
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  const handleSubjectToggle = (subjectId: string) => {
    const newSelected = new Set(selectedSubjects);
    if (newSelected.has(subjectId)) {
      newSelected.delete(subjectId);
      // Close expanded view if deselecting
      if (expandedSubject === subjectId) {
        setExpandedSubject(null);
      }
    } else {
      newSelected.add(subjectId);
    }
    setSelectedSubjects(newSelected);
  };

  const handleContinue = () => {
    const preferences: SubjectPreference[] = Array.from(selectedSubjects).map((subjectId) => ({
      subject: subjectId,
    }));
    onComplete(preferences);
  };

  const isSelected = (subjectId: string) => selectedSubjects.has(subjectId);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to SciFeed</h1>
        <p className="text-muted-foreground">
          Select the research areas you&apos;re interested in to personalize your feed
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {RESEARCH_SUBJECTS.map((subject) => {
          const selected = isSelected(subject.id);

          return (
            <Card
              key={subject.id}
              className={`cursor-pointer transition-all ${
                selected ? "ring-2 ring-primary" : "hover:border-primary/50"
              }`}
              onClick={() => handleSubjectToggle(subject.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 space-y-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {subject.name}
                      {selected && (
                        <Badge variant="default" className="text-xs">
                          Selected
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {subject.description}
                    </CardDescription>
                  </div>
                  <Checkbox
                    checked={selected}
                    onCheckedChange={() => handleSubjectToggle(subject.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </CardHeader>

              {selected && subject.subcategories && (
                <CardContent className="pt-0">
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p className="font-medium">Includes:</p>
                    <div className="flex flex-wrap gap-1">
                      {subject.subcategories.slice(0, 3).map((sub) => (
                        <span key={sub} className="text-xs">
                          {sub}
                          {subject.subcategories &&
                           subject.subcategories.indexOf(sub) < 2 &&
                           subject.subcategories.indexOf(sub) < subject.subcategories.length - 1 &&
                           ", "}
                        </span>
                      ))}
                      {subject.subcategories.length > 3 && (
                        <span className="text-xs">
                          +{subject.subcategories.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center pt-4">
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {selectedSubjects.size === 0
              ? "Select at least one subject to continue"
              : `${selectedSubjects.size} subject${selectedSubjects.size === 1 ? "" : "s"} selected`}
          </p>
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={selectedSubjects.size === 0}
            className="min-w-[200px]"
          >
            Continue to Feed
          </Button>
        </div>
      </div>
    </div>
  );
}
