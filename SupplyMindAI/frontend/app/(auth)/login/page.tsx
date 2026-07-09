import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

/**
 * Login Page – scaffold only.
 * Business logic and form implementation go here in the features phase.
 */
export default function LoginPage() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
      <h1 className="mb-2 text-2xl font-semibold text-white">Welcome back</h1>
      <p className="mb-6 text-sm text-white/60">
        Sign in to your SupplyMind AI workspace
      </p>
      {/* LoginForm feature component will be placed here */}
      <div className="text-center text-xs text-white/40">
        [LoginForm component — implement in features/auth]
      </div>
    </div>
  );
}
