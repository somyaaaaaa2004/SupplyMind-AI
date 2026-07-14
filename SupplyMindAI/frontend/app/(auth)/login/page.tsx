'use client';

import { LoginForm } from '@/features/auth';

export default function LoginPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#F9FAFB]">Welcome back</h1>
        <p className="mt-1 text-sm text-[#9CA3AF]">
          Sign in to your AUTONOMOUS PROCUREMENT AND LOGISTICS BRAIN workspace
        </p>
      </div>
      <LoginForm />
    </>
  );
}
