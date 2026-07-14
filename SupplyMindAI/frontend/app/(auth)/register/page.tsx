'use client';

import { RegisterForm } from '@/features/auth';

export default function RegisterPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#F9FAFB]">Create account</h1>
        <p className="mt-1 text-sm text-[#9CA3AF]">
          Join AUTONOMOUS PROCUREMENT AND LOGISTICS BRAIN — it&apos;s free to get started
        </p>
      </div>
      <RegisterForm />
    </>
  );
}
