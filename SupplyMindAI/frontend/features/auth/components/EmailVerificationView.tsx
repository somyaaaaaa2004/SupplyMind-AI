'use client';

import { useEffect } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button, Alert } from '@/components/common';

interface EmailVerificationViewProps {
  email?: string;
  token?: string;
}

export function EmailVerificationView({ email, token }: EmailVerificationViewProps) {
  const { verifyEmailMutation, forgotPasswordMutation } = useAuth();

  // Auto-verify if token is present in URL
  useEffect(() => {
    if (token && !verifyEmailMutation.isPending && !verifyEmailMutation.isSuccess) {
      verifyEmailMutation.mutate(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleResend = () => {
    if (email) {
      forgotPasswordMutation.mutate(email);
    }
  };

  const apiError = verifyEmailMutation.error as any;
  const apiErrorMessage = apiError?.response?.data?.message;

  if (verifyEmailMutation.isSuccess) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-[rgba(34,197,94,0.15)] p-4">
            <CheckCircle2 className="h-10 w-10 text-[#22C55E]" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#F9FAFB]">Email verified!</h3>
          <p className="mt-2 text-sm text-[#9CA3AF]">
            Your email has been verified. You can now sign in to your account.
          </p>
        </div>
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => (window.location.href = '/auth/login')}
        >
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <div className="rounded-full bg-[rgba(59,130,246,0.15)] p-4">
          <Mail className="h-10 w-10 text-[#3B82F6]" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[#F9FAFB]">Verify your email</h3>
        <p className="mt-2 text-sm text-[#9CA3AF]">
          {token
            ? 'Verifying your email address…'
            : <>
                We sent a verification link to{' '}
                {email && <span className="font-medium text-[#F9FAFB]">{email}</span>}.
                {' '}Click the link in your email to continue.
              </>
          }
        </p>
      </div>

      {apiErrorMessage && <Alert variant="error">{apiErrorMessage}</Alert>}

      {verifyEmailMutation.isPending && (
        <p className="text-sm text-[#9CA3AF]">Verifying…</p>
      )}

      {email && !token && (
        <div className="space-y-3">
          <p className="text-sm text-[#6B7280]">
            Didn&apos;t receive the email?
          </p>
          <Button
            type="button"
            variant="outline"
            size="md"
            loading={forgotPasswordMutation.isPending}
            disabled={forgotPasswordMutation.isPending}
            onClick={handleResend}
            className="w-full"
          >
            Resend verification email
          </Button>
        </div>
      )}
    </div>
  );
}
