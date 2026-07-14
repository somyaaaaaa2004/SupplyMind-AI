import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { CheckCircle2, Loader2, MailCheck } from 'lucide-react';

import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';

export default function VerifyEmail() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!user) setLocation('/signup');
  }, [user, setLocation]);

  const verify = async () => {
    setVerifying(true);
    await new Promise((r) => setTimeout(r, 900));
    setVerifying(false);
    setVerified(true);
  };

  return (
    <AuthLayout
      title="Verify your email"
      description="We've sent a confirmation link to your inbox."
    >
      {verified ? (
        <div className="space-y-4">
          <div className="rounded-lg border border-success/30 bg-success/10 p-4" data-testid="text-verified">
            <div className="flex items-center gap-2 text-success">
              <CheckCircle2 className="size-4" />
              <p className="text-sm font-medium">Email verified</p>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Your workspace is ready. Let's get you to your dashboard.
            </p>
          </div>
          <Button className="w-full" onClick={() => setLocation('/')} data-testid="button-go-dashboard">
            Go to dashboard
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
            <MailCheck className="size-8 shrink-0 text-primary" />
            <p className="text-sm text-muted-foreground">
              We sent a verification link to{' '}
              <span className="font-medium text-foreground">{user?.email}</span>. In
              this demo, click below to simulate confirming it.
            </p>
          </div>
          <Button className="w-full" onClick={verify} disabled={verifying} data-testid="button-verify-email">
            {verifying && <Loader2 className="size-4 animate-spin" />}
            Simulate email confirmation
          </Button>
        </div>
      )}
    </AuthLayout>
  );
}
