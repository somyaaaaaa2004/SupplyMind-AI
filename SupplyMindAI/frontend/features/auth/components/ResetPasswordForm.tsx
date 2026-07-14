'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button, Input, Alert } from '@/components/common';

const schema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type Values = z.infer<typeof schema>;

interface ResetPasswordFormProps {
  token: string;
}

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: '8+ characters', ok: password.length >= 8 },
    { label: 'Uppercase', ok: /[A-Z]/.test(password) },
    { label: 'Number', ok: /[0-9]/.test(password) },
    { label: 'Special char', ok: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = checks.filter((c) => c.ok).length;
  const colors = ['bg-[#EF4444]', 'bg-[#F59E0B]', 'bg-[#F59E0B]', 'bg-[#22C55E]', 'bg-[#22C55E]'];

  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${i < score ? colors[score] : 'bg-[rgba(255,255,255,0.06)]'}`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {checks.map((c) => (
          <span
            key={c.label}
            className={`flex items-center gap-1 text-xs ${c.ok ? 'text-[#22C55E]' : 'text-[#6B7280]'}`}
          >
            <CheckCircle2 className="h-3 w-3" />
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { resetPasswordMutation } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const passwordValue = watch('password', '');

  const onSubmit = (data: Values) => {
    resetPasswordMutation.mutate({ token, password: data.password });
  };

  const apiError = resetPasswordMutation.error as any;
  const apiErrorMessage = apiError?.response?.data?.message;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Input
          label="New Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Create a strong password"
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
        <PasswordStrength password={passwordValue} />
      </div>

      <Input
        label="Confirm Password"
        name="confirmPassword"
        type={showConfirm ? 'text' : 'password'}
        placeholder="Repeat your new password"
        startIcon={<Lock className="h-4 w-4" />}
        endIcon={
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            className="text-[#6B7280] hover:text-[#F9FAFB] transition-colors"
            tabIndex={-1}
          >
            {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
        error={errors.confirmPassword?.message}
        required
        {...register('confirmPassword')}
      />

      {apiErrorMessage && <Alert variant="error">{apiErrorMessage}</Alert>}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={resetPasswordMutation.isPending}
        disabled={resetPasswordMutation.isPending}
        className="w-full"
      >
        Reset Password
      </Button>

      <p className="text-center text-sm text-[#9CA3AF]">
        <Link
          href="/auth/login"
          className="text-[#3B82F6] hover:text-[#2563EB] transition-colors font-medium"
        >
          ← Back to sign in
        </Link>
      </p>
    </form>
  );
}
