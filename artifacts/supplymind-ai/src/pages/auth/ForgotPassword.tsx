import { useState, type FormEvent } from 'react';
import { Link } from 'wouter';
import { CheckCircle2, Loader2 } from 'lucide-react';

import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth';

export default function ForgotPassword() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await requestPasswordReset(email);
    setLoading(false);
    setSent(true);
  };

  return (
    <AuthLayout
      title="Reset your password"
      description="Enter your work email and we'll send you a reset link."
    >
      {sent ? (
        <div className="rounded-lg border border-success/30 bg-success/10 p-4" data-testid="text-reset-sent">
          <div className="flex items-center gap-2 text-success">
            <CheckCircle2 className="size-4" />
            <p className="text-sm font-medium">Check your inbox</p>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            If an account exists for {email}, a password reset link is on its way.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Work email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              data-testid="input-email"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading} data-testid="button-send-reset">
            {loading && <Loader2 className="size-4 animate-spin" />}
            Send reset link
          </Button>
        </form>
      )}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Remembered it after all?{' '}
        <Link href="/login" className="font-medium text-primary hover:underline" data-testid="link-login">
          Back to sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
