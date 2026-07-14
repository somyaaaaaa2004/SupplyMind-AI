import { Link } from 'wouter';
import { CompassIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="grid-pattern flex min-h-screen w-full flex-col items-center justify-center bg-background px-4 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10">
        <CompassIcon className="size-7 text-primary" />
      </div>
      <p className="mt-6 text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Error 404
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Button asChild className="mt-6" data-testid="button-back-home">
        <Link href="/">Back to dashboard</Link>
      </Button>
    </div>
  );
}
