import type { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';

export function AuthLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-500 shadow-[0_0_20px_-4px_rgba(59,130,246,0.6)]">
              <Sparkles className="size-4.5 text-white" />
            </div>
            <span className="max-w-[280px] text-xs font-semibold leading-snug tracking-tight uppercase sm:text-sm">
              Autonomous Procurement And Logistics Brain
            </span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight" data-testid="text-auth-title">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
      <div className="relative hidden overflow-hidden border-l border-border bg-card lg:block">
        <div className="grid-pattern absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-500/10" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <div />
          <div className="max-w-md">
            <p className="text-lg font-medium leading-relaxed text-foreground/90">
              "AUTONOMOUS PROCUREMENT AND LOGISTICS BRAIN cut our approval cycle time by 40% and surfaced
              savings we didn't know we were leaving on the table."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                PN
              </div>
              <div>
                <p className="text-sm font-medium">Priya Natarajan</p>
                <p className="text-xs text-muted-foreground">
                  VP Procurement, Meridian Industrial
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-8 text-xs text-muted-foreground">
            <div>
              <p className="text-xl font-semibold text-foreground">$612K</p>
              savings tracked YTD
            </div>
            <div>
              <p className="text-xl font-semibold text-foreground">2.3 days</p>
              avg. approval time
            </div>
            <div>
              <p className="text-xl font-semibold text-foreground">94.6%</p>
              on-time vendor rate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
