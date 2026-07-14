import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import { DEMO_USERS, ROLE_LABELS, type DemoUser, type Role } from '@/lib/mock-data';

// NOTE: This is a demo authentication layer for previewing the product
// experience. It stores session state in localStorage and does not talk to a
// real backend yet -- there is no password hashing, token issuance, or
// server-side session validation happening here.

const STORAGE_KEY = 'supplymind.session';

interface Session {
  user: DemoUser;
}

interface AuthContextValue {
  user: DemoUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signup: (params: { name: string; email: string; password: string; role: Role; department: string }) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<{ ok: boolean }>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const session = JSON.parse(raw) as Session;
        setUser(session.user);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const persist = (session: Session | null) => {
    if (session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const login: AuthContextValue['login'] = async (email, password) => {
    await delay(600);
    if (!password || password.length < 4) {
      return { ok: false, error: 'Incorrect email or password.' };
    }
    const existing = DEMO_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    const demoUser: DemoUser = existing ?? {
      id: `u-${Date.now()}`,
      name: email.split('@')[0].replace(/[._]/g, ' '),
      email,
      role: 'buyer',
      department: 'Procurement',
      avatarInitials: email.slice(0, 2).toUpperCase(),
    };
    setUser(demoUser);
    persist({ user: demoUser });
    return { ok: true };
  };

  const signup: AuthContextValue['signup'] = async ({ name, email, role, department }) => {
    await delay(700);
    const initials = name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    const demoUser: DemoUser = {
      id: `u-${Date.now()}`,
      name,
      email,
      role,
      department,
      avatarInitials: initials || 'US',
    };
    setUser(demoUser);
    persist({ user: demoUser });
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    persist(null);
  };

  const requestPasswordReset: AuthContextValue['requestPasswordReset'] = async () => {
    await delay(600);
    return { ok: true };
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, requestPasswordReset }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export { ROLE_LABELS };
export type { Role };
