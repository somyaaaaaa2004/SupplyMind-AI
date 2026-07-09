/**
 * Auth Zustand store.
 * Holds in-memory access token + current user.
 * Refresh token lives in an httpOnly cookie — never in JS.
 */

import { create } from "zustand";
import { devtools } from "zustand/middleware";

import type { AuthState, AuthTokens, User } from "@/types";

interface AuthActions {
  setUser: (user: User) => void;
  setTokens: (tokens: AuthTokens) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    (set) => ({
      ...initialState,

      setUser: (user) =>
        set({ user, isAuthenticated: true, error: null }, false, "auth/setUser"),

      setTokens: (tokens) =>
        set({ tokens }, false, "auth/setTokens"),

      clearAuth: () =>
        set(initialState, false, "auth/clearAuth"),

      setLoading: (isLoading) =>
        set({ isLoading }, false, "auth/setLoading"),

      setError: (error) =>
        set({ error }, false, "auth/setError"),
    }),
    { name: "SupplyMind::Auth" },
  ),
);
