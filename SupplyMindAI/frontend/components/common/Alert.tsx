'use client';

import { type ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/utils/cn';

type AlertVariant = 'error' | 'success' | 'warning' | 'info';

const VARIANT_STYLES: Record<
  AlertVariant,
  { container: string; icon: typeof AlertCircle }
> = {
  error: {
    container: 'border-red-500/30 bg-red-500/10 text-red-300',
    icon: AlertCircle,
  },
  success: {
    container: 'border-green-500/30 bg-green-500/10 text-green-300',
    icon: CheckCircle2,
  },
  warning: {
    container: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
    icon: AlertTriangle,
  },
  info: {
    container: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
    icon: Info,
  },
};

export interface AlertProps {
  variant?: AlertVariant;
  children: ReactNode;
  className?: string;
}

export function Alert({ variant = 'info', children, className }: AlertProps) {
  const styles = VARIANT_STYLES[variant];
  const Icon = styles.icon;

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-2 rounded-lg border px-3 py-2.5 text-sm',
        styles.container,
        className,
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
