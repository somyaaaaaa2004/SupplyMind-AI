import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

/**
 * Main Dashboard Page – scaffold only.
 * KPI cards, charts, and activity feed go here in the features phase.
 */
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Enterprise procurement intelligence at a glance.
        </p>
      </div>
      {/* Feature components will be placed here */}
      <div className="rounded-lg border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
        [Dashboard feature components — implement in features/analytics]
      </div>
    </div>
  );
}
