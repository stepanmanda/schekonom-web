"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { VerifyCodeResponse } from "../demo/api";

interface AuthState {
  session: VerifyCodeResponse | null;
  login: (session: VerifyCodeResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<VerifyCodeResponse | null>(null);

  const login = useCallback((s: VerifyCodeResponse) => setSession(s), []);
  const logout = useCallback(() => setSession(null), []);

  return (
    <AuthContext.Provider value={{ session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
