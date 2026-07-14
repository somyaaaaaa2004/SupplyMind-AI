'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, MailCheck } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button, Input, Alert } from '@/components/common';

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type Values = z.infer<typeof schema>;

export function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const { forgotPasswordMutation } = useAuth();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = (data: Values) => {
    forgotPasswordMutation.mutate(data.email, {
      onSuccess: () => {
        setSubmittedEmail(data.email);
        setSubmitted(true);
      },
    });
  };

  const handleResend = () => {
    const email = submittedEmail || getValues('email');
    if (email) forgotPasswordMutation.mutate(email);
  };

  if (submitted) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-[rgba(59,130,246,0.15)] p-4">
            <MailCheck className="h-10 w-10 text-[#3B82F6]" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#F9FAFB]">Check your inbox</h3>
          <p className="mt-2 text-sm text-[#9CA3AF]">
            We sent a password reset link to{' '}
            <span className="font-medium text-[#F9FAFB]">{submittedEmail}</span>
          </p>
        </div>
        <p className="text-sm text-[#6B7280]">
          Didn&apos;t receive it?{' '}
          <button
            type="button"
            onClick={handleResend}
            disabled={forgotPasswordMutation.isPending}
            className="text-[#3B82F6] hover:text-[#2563EB] transition-colors font-medium disabled:opacity-50"
          >
            {forgotPasswordMutation.isPending ? 'Sending…' : 'Resend email'}
          </button>
        </p>
        <Link
          href="/auth/login"
          className="block text-sm text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors"
        >
          ← Back to sign in
        </Link>
      </div>
    );
  }

  const apiError = forgotPasswordMutation.error as any;
  const apiErrorMessage = apiError?.response?.data?.message;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <Input
        label="Email address"
        name="email"
        type="email"
        placeholder="you@company.com"
        startIcon={<Mail className="h-4 w-4" />}
        error={errors.email?.message}
        required
        {...register('email')}
      />

      {apiErrorMessage && <Alert variant="error">{apiErrorMessage}</Alert>}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={forgotPasswordMutation.isPending}
        disabled={forgotPasswordMutation.isPending}
        className="w-full"
      >
        Send Reset Link
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
