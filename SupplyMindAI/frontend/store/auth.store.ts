/**
 * Auth Zustand store.
 * accessToken lives in memory only (NOT persisted).
 * user is persisted via localStorage (no sensitive fields).
 * Refresh token lives in an httpOnly cookie — never in JS.
 */

import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

import type { User } from '@/types';

interface AuthStore {
  // State
  user: User | null;
  accessToken: string | null; // in-memory only, NOT persisted
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  login: (user: User, accessToken: string) => void;
  logout: () => void;
  updateUser: (partial: Partial<User>) => void;
  setIsLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        // ─── Initial state ────────────────────────────────────────────
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false,

        // ─── Actions ──────────────────────────────────────────────────
        setUser: (user) =>
          set(
            { user, isAuthenticated: user !== null },
            false,
            'auth/setUser',
          ),

        setAccessToken: (token) =>
          set({ accessToken: token }, false, 'auth/setAccessToken'),

        login: (user, accessToken) =>
          set(
            { user, accessToken, isAuthenticated: true, isLoading: false },
            false,
            'auth/login',
          ),

        logout: () => {
          // Fire-and-forget logout API call — handled in useAuth hook
          set(
            { user: null, accessToken: null, isAuthenticated: false, isLoading: false },
            false,
            'auth/logout',
          );
        },

        updateUser: (partial) => {
          const current = get().user;
          if (!current) return;
          set({ user: { ...current, ...partial } }, false, 'auth/updateUser');
        },

        setIsLoading: (isLoading) =>
          set({ isLoading }, false, 'auth/setIsLoading'),
      }),
      {
        name: 'supplymind-auth',
        storage: createJSONStorage(() => localStorage),
        // Persist ONLY user — never the accessToken
        partialize: (state) => ({ user: state.user }),
        // Rehydrate: if user exists in storage, mark as authenticated
        onRehydrateStorage: () => (state) => {
          if (state?.user) {
            state.isAuthenticated = true;
          }
        },
      },
    ),
    { name: 'SupplyMind::Auth' },
  ),
);
