import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { AlertTriangle, ArrowRight, Info, Sparkles, TrendingUp } from 'lucide-react';

import { PageHeader } from '@/components/common/PageHeader';
import { KpiCard } from '@/components/common/KpiCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth';
import {
  ACTIVITY_FEED,
  AI_INSIGHTS,
  CATEGORY_BREAKDOWN,
  KPIS,
  SPEND_TREND,
  TOP_VENDORS_CHART,
} from '@/lib/mock-data';

const SEVERITY_STYLES: Record<string, { icon: typeof Info; text: string; bg: string }> = {
  info: { icon: Info, text: 'text-primary', bg: 'bg-primary/10' },
  warning: { icon: AlertTriangle, text: 'text-warning', bg: 'bg-warning/10' },
  critical: { icon: AlertTriangle, text: 'text-destructive', bg: 'bg-destructive/10' },
};

const ACTIVITY_DOT: Record<string, string> = {
  approval: 'bg-success',
  order: 'bg-primary',
  vendor: 'bg-chart-4',
  alert: 'bg-destructive',
  request: 'bg-warning',
};

export default function Dashboard() {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] ?? 'there';

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Good to see you, ${firstName}`}
        description="Here's what's happening across procurement, logistics, and inventory today."
        actions={
          <Button data-testid="button-new-request">
            <Sparkles className="size-4" />
            Ask AI Copilot
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {KPIS.map((kpi) => (
          <KpiCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Spend vs. Budget</CardTitle>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-primary" /> Spend
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-muted-foreground" /> Budget
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SPEND_TREND} margin={{ top: 10, right: 12, left: -12, bottom: 0 }}>
                  <defs>
                    <linearGradient id="spendFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <YAxis
                    tickFormatter={(v) => `$${v}M`}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    width={44}
                  />
                  <Tooltip
                    formatter={(value: number) => [`$${value}M`, '']}
                    contentStyle={{
                      background: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="budget"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    fill="transparent"
                  />
                  <Area
                    type="monotone"
                    dataKey="spend"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2.5}
                    fill="url(#spendFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Spend by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CATEGORY_BREAKDOWN}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={48}
                    outerRadius={72}
                    paddingAngle={2}
                    stroke="hsl(var(--card))"
                    strokeWidth={2}
                  >
                    {CATEGORY_BREAKDOWN.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => [`${value}%`, name]}
                    contentStyle={{
                      background: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 space-y-1.5">
              {CATEGORY_BREAKDOWN.map((c) => (
                <div key={c.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="size-2 rounded-full" style={{ background: c.color }} />
                    {c.name}
                  </span>
                  <span className="font-medium">{c.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">AI Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {AI_INSIGHTS.map((insight) => {
              const style = SEVERITY_STYLES[insight.severity];
              const Icon = style.icon;
              return (
                <div
                  key={insight.id}
                  className="flex items-start gap-3 rounded-lg border border-border p-3 hover-elevate"
                  data-testid={`card-insight-${insight.id}`}
                >
                  <div className={cn('flex size-8 shrink-0 items-center justify-center rounded-md', style.bg)}>
                    <Icon className={cn('size-4', style.text)} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{insight.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{insight.description}</p>
                    <button className="mt-1.5 flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                      {insight.cta}
                      <ArrowRight className="size-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ACTIVITY_FEED.map((item) => (
                <div key={item.id} className="flex gap-3" data-testid={`activity-${item.id}`}>
                  <div className="flex flex-col items-center">
                    <span className={cn('mt-1.5 size-2 rounded-full', ACTIVITY_DOT[item.type])} />
                    <span className="mt-1 h-full w-px bg-border" />
                  </div>
                  <div className="pb-1">
                    <p className="text-sm leading-snug">
                      <span className="font-medium">{item.actor}</span>{' '}
                      <span className="text-muted-foreground">{item.action}</span>{' '}
                      {item.target}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Top Vendors by Spend</CardTitle>
          <Badge variant="outline" className="gap-1 text-xs">
            <TrendingUp className="size-3" /> YTD
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TOP_VENDORS_CHART} layout="vertical" margin={{ left: 24 }}>
                <CartesianGrid horizontal={false} stroke="hsl(var(--border))" strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  tickFormatter={(v) => `$${v}K`}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  width={130}
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                />
                <Tooltip
                  formatter={(value: number) => [`$${value}K`, 'Spend']}
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  contentStyle={{
                    background: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="spend" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
