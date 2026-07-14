import { useState, type FormEvent } from 'react';
import { Link, useLocation } from 'wouter';
import { Loader2 } from 'lucide-react';

import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth';
import { DEMO_USERS } from '@/lib/mock-data';

export default function Login() {
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('priya.n@supplymind.ai');
  const [password, setPassword] = useState('demo1234');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.ok) {
      setLocation('/');
    } else {
      setError(result.error ?? 'Something went wrong. Please try again.');
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      description="Sign in to your AUTONOMOUS PROCUREMENT AND LOGISTICS BRAIN workspace."
    >
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
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-primary hover:underline"
              data-testid="link-forgot-password"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            data-testid="input-password"
          />
        </div>
        {error && (
          <p className="text-sm text-destructive" data-testid="text-login-error">
            {error}
          </p>
        )}
        <Button type="submit" className="w-full" disabled={loading} data-testid="button-login">
          {loading && <Loader2 className="size-4 animate-spin" />}
          Sign in
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <Link href="/signup" className="font-medium text-primary hover:underline" data-testid="link-signup">
          Create one
        </Link>
      </p>
      <div className="mt-8 rounded-lg border border-border bg-card p-3">
        <p className="text-xs font-medium text-muted-foreground">Demo accounts (any password 4+ chars)</p>
        <ul className="mt-2 space-y-1">
          {DEMO_USERS.map((u) => (
            <li key={u.id} className="text-xs text-muted-foreground">
              <button
                type="button"
                onClick={() => setEmail(u.email)}
                className="font-mono text-primary hover:underline"
              >
                {u.email}
              </button>{' '}
              — {u.role.replace('_', ' ')}
            </li>
          ))}
        </ul>
      </div>
    </AuthLayout>
  );
}
