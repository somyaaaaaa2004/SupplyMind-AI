import { Link } from 'wouter';
import { ShieldAlert } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function Forbidden() {
  return (
    <div className="grid-pattern flex min-h-screen w-full flex-col items-center justify-center bg-background px-4 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-destructive/10">
        <ShieldAlert className="size-7 text-destructive" />
      </div>
      <p className="mt-6 text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Error 403
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Access restricted</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Your role doesn't have permission to view this page. Contact your workspace
        administrator if you believe this is a mistake.
      </p>
      <Button asChild className="mt-6" data-testid="button-back-home">
        <Link href="/">Back to dashboard</Link>
      </Button>
    </div>
  );
}
