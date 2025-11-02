import type { SubjectPreference } from "./subjects";

const PREFERENCES_KEY = "scifeed_preferences";

export interface UserPreferences {
  subjects: SubjectPreference[];
  hasOnboarded: boolean;
}

// Load preferences from localStorage
export function loadPreferences(): UserPreferences | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    if (!stored) return null;

    return JSON.parse(stored);
  } catch (error) {
    console.error("Error loading preferences:", error);
    return null;
  }
}

// Save preferences to localStorage
export function savePreferences(preferences: UserPreferences): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.error("Error saving preferences:", error);
  }
}

// Clear preferences from localStorage
export function clearPreferences(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(PREFERENCES_KEY);
  } catch (error) {
    console.error("Error clearing preferences:", error);
  }
}

// Check if user has completed onboarding
export function hasCompletedOnboarding(): boolean {
  const prefs = loadPreferences();
  return prefs?.hasOnboarded ?? false;
}
