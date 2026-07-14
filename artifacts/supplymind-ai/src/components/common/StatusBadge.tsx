import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

const TONE_CLASSES: Record<Tone, string> = {
  neutral: 'bg-muted text-muted-foreground border-transparent',
  success: 'bg-success/15 text-success border-success/30',
  warning: 'bg-warning/15 text-warning border-warning/30',
  danger: 'bg-destructive/15 text-destructive border-destructive/30',
  info: 'bg-primary/15 text-primary border-primary/30',
};

export function StatusBadge({
  label,
  tone = 'neutral',
  className,
}: {
  label: string;
  tone?: Tone;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn('font-medium', TONE_CLASSES[tone], className)}
      data-testid={`badge-status-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {label}
    </Badge>
  );
}
