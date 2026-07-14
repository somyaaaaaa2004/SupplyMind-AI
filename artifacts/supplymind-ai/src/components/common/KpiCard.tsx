import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Kpi } from '@/lib/mock-data';

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const positive = kpi.good;
  const data = kpi.sparkline.map((v, i) => ({ i, v }));

  return (
    <Card
      className="relative overflow-hidden p-5 hover-elevate"
      data-testid={`card-kpi-${kpi.id}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground truncate">
            {kpi.label}
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight">{kpi.value}</p>
        </div>
        <div
          className={cn(
            'flex items-center gap-0.5 rounded-full px-2 py-1 text-xs font-medium shrink-0',
            positive
              ? 'bg-success/15 text-success'
              : 'bg-destructive/15 text-destructive',
          )}
        >
          {kpi.trend === 'up' ? (
            <ArrowUpRight className="size-3" />
          ) : (
            <ArrowDownRight className="size-3" />
          )}
          {Math.abs(kpi.delta)}%
        </div>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{kpi.deltaLabel}</p>
      <div className="mt-3 h-10 -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`spark-${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={positive ? 'hsl(var(--success))' : 'hsl(var(--primary))'}
                  stopOpacity={0.4}
                />
                <stop
                  offset="100%"
                  stopColor={positive ? 'hsl(var(--success))' : 'hsl(var(--primary))'}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke={positive ? 'hsl(var(--success))' : 'hsl(var(--primary))'}
              strokeWidth={2}
              fill={`url(#spark-${kpi.id})`}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
