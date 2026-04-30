"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { VerifyCodeResponse } from "../demo/api";

interface AuthState {
  session: VerifyCodeResponse | null;
  ready: boolean;
  login: (session: VerifyCodeResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

const STORAGE_KEY = "ekonomos:demo-session";

function loadFromStorage(): VerifyCodeResponse | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as VerifyCodeResponse) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<VerifyCodeResponse | null>(null);
  const [ready, setReady] = useState(false);

  // Load session from sessionStorage on mount
  useEffect(() => {
    const stored = loadFromStorage();
    if (stored) setSession(stored);
    setReady(true);
  }, []);

  const login = useCallback((s: VerifyCodeResponse) => {
    setSession(s);
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(s));
      } catch {
        // sessionStorage may be unavailable (private browsing) — fall back to in-memory only
      }
    }
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ session, ready, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
