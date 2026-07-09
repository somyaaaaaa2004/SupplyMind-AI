/**
 * Auth service – API call functions for authentication endpoints.
 * All business logic stays in feature hooks; this is a thin API wrapper.
 */

import { get, post } from "./api";

import type { AuthTokens, LoginCredentials, RegisterPayload, User } from "@/types";

export const authService = {
  /** POST /auth/login */
  login: (credentials: LoginCredentials) =>
    post<{ user: User; tokens: AuthTokens }>("/auth/login", credentials),

  /** POST /auth/register */
  register: (payload: RegisterPayload) =>
    post<{ user: User; tokens: AuthTokens }>("/auth/register", payload),

  /** POST /auth/logout */
  logout: () => post<void>("/auth/logout"),

  /** POST /auth/refresh – uses httpOnly cookie */
  refresh: () => post<{ tokens: AuthTokens }>("/auth/refresh"),

  /** GET /auth/me */
  me: () => get<User>("/auth/me"),

  /** POST /auth/forgot-password */
  forgotPassword: (email: string) =>
    post<void>("/auth/forgot-password", { email }),

  /** POST /auth/reset-password */
  resetPassword: (token: string, password: string) =>
    post<void>("/auth/reset-password", { token, password }),
};
