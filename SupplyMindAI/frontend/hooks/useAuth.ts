'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';
import type { LoginCredentials } from '@/types';
import type { RegisterData, ResetPasswordData } from '@/services/auth.service';

export function useAuth() {
  const router = useRouter();
  const store = useAuthStore();

  // ─── Login ───────────────────────────────────────────────────────────────
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (response) => {
      const { user, accessToken } = response.data;
      store.login(user, accessToken);
      toast.success(`Welcome back, ${user.firstName}!`);
      router.push('/dashboard');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message ?? 'Login failed. Please try again.';
      toast.error(message);
    },
  });

  // ─── Logout ──────────────────────────────────────────────────────────────
  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      store.logout();
      toast.success('Signed out successfully.');
      router.push('/auth/login');
    },
    onError: () => {
      // Even on error, clear local state and redirect
      store.logout();
      router.push('/auth/login');
    },
  });

  // ─── Register ────────────────────────────────────────────────────────────
  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),
    onSuccess: (_, variables) => {
      toast.success('Account created! Please verify your email.');
      router.push(`/auth/verify-email?email=${encodeURIComponent(variables.email)}`);
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message ?? 'Registration failed. Please try again.';
      toast.error(message);
    },
  });

  // ─── Forgot Password ─────────────────────────────────────────────────────
  const forgotPasswordMutation = useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
    onSuccess: () => {
      toast.success('Password reset email sent! Check your inbox.');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message ?? 'Failed to send reset email.';
      toast.error(message);
    },
  });

  // ─── Reset Password ──────────────────────────────────────────────────────
  const resetPasswordMutation = useMutation({
    mutationFn: ({ token, password }: ResetPasswordData) =>
      authService.resetPassword(token, password),
    onSuccess: () => {
      toast.success('Password reset successfully! Please sign in.');
      router.push('/auth/login');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message ?? 'Failed to reset password.';
      toast.error(message);
    },
  });

  // ─── Verify Email ────────────────────────────────────────────────────────
  const verifyEmailMutation = useMutation({
    mutationFn: (token: string) => authService.verifyEmail(token),
    onSuccess: () => {
      toast.success('Email verified! You can now sign in.');
      router.push('/auth/login');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message ?? 'Email verification failed.';
      toast.error(message);
    },
  });

  return {
    // State
    user: store.user,
    accessToken: store.accessToken,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,

    // Mutations
    loginMutation,
    logoutMutation,
    registerMutation,
    forgotPasswordMutation,
    resetPasswordMutation,
    verifyEmailMutation,

    // Convenience booleans
    isLoginPending: loginMutation.isPending,
    isLogoutPending: logoutMutation.isPending,
    isRegisterPending: registerMutation.isPending,
  };
}
