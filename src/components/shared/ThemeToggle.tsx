"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const nextLabel = resolvedTheme === "dark" ? "světlý" : "tmavý";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Přepnout na ${nextLabel} motiv`}
      title={`Přepnout na ${nextLabel} motiv`}
    >
      {resolvedTheme === "dark" ? (
        <Sun size={15} aria-hidden="true" />
      ) : (
        <Moon size={15} aria-hidden="true" />
      )}
      {!compact && (
        <span>{resolvedTheme === "dark" ? "Světlá verze" : "Tmavá verze"}</span>
      )}
    </button>
  );
}
