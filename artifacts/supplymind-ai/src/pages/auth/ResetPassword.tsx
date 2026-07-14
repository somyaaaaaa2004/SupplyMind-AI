import { useState, type FormEvent } from 'react';
import { Link, useLocation } from 'wouter';
import { CheckCircle2, Loader2 } from 'lucide-react';

import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ResetPassword() {
  const [, setLocation] = useLocation();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setError(null);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setDone(true);
  };

  return (
    <AuthLayout
      title="Set a new password"
      description="Choose a strong password for your AUTONOMOUS PROCUREMENT AND LOGISTICS BRAIN account."
    >
      {done ? (
        <div className="space-y-4">
          <div className="rounded-lg border border-success/30 bg-success/10 p-4" data-testid="text-reset-done">
            <div className="flex items-center gap-2 text-success">
              <CheckCircle2 className="size-4" />
              <p className="text-sm font-medium">Password updated</p>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              You can now sign in with your new password.
            </p>
          </div>
          <Button className="w-full" onClick={() => setLocation('/login')} data-testid="button-go-login">
            Continue to sign in
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="password">New password</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="input-password"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirm">Confirm password</Label>
            <Input
              id="confirm"
              type="password"
              required
              minLength={8}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              data-testid="input-confirm-password"
            />
          </div>
          {error && (
            <p className="text-sm text-destructive" data-testid="text-reset-error">
              {error}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={loading} data-testid="button-reset-password">
            {loading && <Loader2 className="size-4 animate-spin" />}
            Update password
          </Button>
        </form>
      )}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link href="/login" className="font-medium text-primary hover:underline" data-testid="link-login">
          Back to sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
