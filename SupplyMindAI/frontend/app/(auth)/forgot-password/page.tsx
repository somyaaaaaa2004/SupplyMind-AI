'use client';

import { ForgotPasswordForm } from '@/features/auth';

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#F9FAFB]">Forgot password?</h1>
        <p className="mt-1 text-sm text-[#9CA3AF]">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>
      <ForgotPasswordForm />
    </>
  );
}
