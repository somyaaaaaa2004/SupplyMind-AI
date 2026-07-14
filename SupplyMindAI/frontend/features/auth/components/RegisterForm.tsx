'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { ROLE_SELECT_OPTIONS } from '../constants';
import { Button, Input, Select, Alert } from '@/components/common';

const registerSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required').max(50),
    lastName: z.string().min(1, 'Last name is required').max(50),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    role: z.string().min(1, 'Please select a role'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { registerMutation } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: data.role,
    });
  };

  const apiError = registerMutation.error as any;
  const apiErrorMessage = apiError?.response?.data?.message;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          name="firstName"
          placeholder="John"
          startIcon={<User className="h-4 w-4" />}
          error={errors.firstName?.message}
          required
          {...register('firstName')}
        />
        <Input
          label="Last Name"
          name="lastName"
          placeholder="Doe"
          startIcon={<User className="h-4 w-4" />}
          error={errors.lastName?.message}
          required
          {...register('lastName')}
        />
      </div>

      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="you@company.com"
        startIcon={<Mail className="h-4 w-4" />}
        error={errors.email?.message}
        required
        {...register('email')}
      />

      <Input
        label="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Create a strong password"
        startIcon={<Lock className="h-4 w-4" />}
        endIcon={
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="text-[#6B7280] hover:text-[#F9FAFB] transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
        error={errors.password?.message}
        required
        {...register('password')}
      />

      <Input
        label="Confirm Password"
        name="confirmPassword"
        type={showConfirm ? 'text' : 'password'}
        placeholder="Repeat your password"
        startIcon={<Lock className="h-4 w-4" />}
        endIcon={
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            className="text-[#6B7280] hover:text-[#F9FAFB] transition-colors"
            tabIndex={-1}
          >
            {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
        error={errors.confirmPassword?.message}
        required
        {...register('confirmPassword')}
      />

      <Select
        label="Role"
        name="role"
        options={ROLE_SELECT_OPTIONS}
        placeholder="Select your role"
        error={errors.role?.message}
        {...register('role')}
      />

      {apiErrorMessage && (
        <Alert variant="error">{apiErrorMessage}</Alert>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={registerMutation.isPending}
        disabled={registerMutation.isPending}
        className="w-full"
      >
        Create Account
      </Button>

      <p className="text-center text-sm text-[#9CA3AF]">
        Already have an account?{' '}
        <Link
          href="/auth/login"
          className="text-[#3B82F6] hover:text-[#2563EB] transition-colors font-medium"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
