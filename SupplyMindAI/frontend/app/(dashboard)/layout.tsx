/**
 * Dashboard Layout
 * Wraps all authenticated routes.
 * Sidebar, topbar, and breadcrumbs will live here.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar – implement in layouts/DashboardSidebar */}
      <aside className="hidden w-64 flex-shrink-0 border-r border-border lg:flex lg:flex-col">
        <div className="p-4 text-xs text-muted-foreground">
          [Sidebar – implement in layouts/]
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar – implement in layouts/DashboardTopbar */}
        <header className="h-14 flex-shrink-0 border-b border-border px-6">
          <div className="flex h-full items-center text-xs text-muted-foreground">
            [Topbar – implement in layouts/]
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
