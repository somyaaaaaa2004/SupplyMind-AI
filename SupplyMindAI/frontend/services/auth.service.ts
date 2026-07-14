/**
 * Auth service – thin API wrapper for all authentication endpoints.
 */

import { get, post } from './api';
import type { AuthTokens, LoginCredentials, RegisterPayload, User } from '@/types';

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
  organizationName?: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
}

export const authService = {
  /** POST /auth/login */
  login: (credentials: LoginCredentials) =>
    post<{ user: User; accessToken: string; tokens?: AuthTokens }>('/auth/login', credentials),

  /** POST /auth/register */
  register: (data: RegisterData) =>
    post<{ user: User; accessToken: string }>('/auth/register', data),

  /** POST /auth/logout */
  logout: () => post<void>('/auth/logout'),

  /** POST /auth/forgot-password */
  forgotPassword: (email: string) =>
    post<void>('/auth/forgot-password', { email }),

  /** POST /auth/reset-password */
  resetPassword: (token: string, password: string) =>
    post<void>('/auth/reset-password', { token, password }),

  /** POST /auth/verify-email */
  verifyEmail: (token: string) =>
    post<void>('/auth/verify-email', { token }),

  /** GET /auth/me */
  getMe: () => get<User>('/auth/me'),

  /** POST /auth/refresh – uses httpOnly cookie */
  refreshToken: () =>
    post<{ accessToken: string }>('/auth/refresh'),
};
