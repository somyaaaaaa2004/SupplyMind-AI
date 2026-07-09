/**
 * Auth Layout
 * Wraps all unauthenticated routes: /login, /register, /forgot-password
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800">
      <div className="w-full max-w-md px-4">
        {/* Logo placeholder */}
        <div className="mb-8 text-center">
          <span className="text-2xl font-bold tracking-tight text-white">
            SupplyMind <span className="text-brand-400">AI</span>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
