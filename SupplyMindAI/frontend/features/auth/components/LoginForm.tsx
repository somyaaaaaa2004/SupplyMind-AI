'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

// Import from @/components/common (created by parallel agent)
import {
  Button,
  Input,
  Checkbox,
  Alert,
} from '@/components/common';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { loginMutation } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: false },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate({
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
    });
  };

  const apiError = loginMutation.error as any;
  const apiErrorMessage = apiError?.response?.data?.message;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="you@company.com"
        startIcon={<Mail className="h-4 w-4" />}
        error={errors.email?.message}
        required
        {...register('email')}
      />

      <Input
        label="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter your password"
        startIcon={<Lock className="h-4 w-4" />}
        endIcon={
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="text-[#6B7280] hover:text-[#F9FAFB] transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
        error={errors.password?.message}
        required
        {...register('password')}
      />

      <div className="flex items-center justify-between">
        <Checkbox label="Remember me" name="rememberMe" {...register('rememberMe')} />
        <Link
          href="/auth/forgot-password"
          className="text-sm text-[#3B82F6] hover:text-[#2563EB] transition-colors"
        >
          Forgot password?
        </Link>
      </div>

      {apiErrorMessage && (
        <Alert variant="error">{apiErrorMessage}</Alert>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loginMutation.isPending}
        disabled={loginMutation.isPending}
        className="w-full"
      >
        Sign In
      </Button>

      <p className="text-center text-sm text-[#9CA3AF]">
        Don&apos;t have an account?{' '}
        <Link
          href="/auth/register"
          className="text-[#3B82F6] hover:text-[#2563EB] transition-colors font-medium"
        >
          Create one
        </Link>
      </p>
    </form>
  );
}
