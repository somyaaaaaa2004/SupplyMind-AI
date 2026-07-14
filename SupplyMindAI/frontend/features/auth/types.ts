/**
 * Auth feature-level types.
 */

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isEmailVerified: boolean;
  avatar?: string;
  department?: string;
  phone?: string;
  organizationId?: string;
  organizationName?: string;
  isActive?: boolean;
  createdAt: string;
  updatedAt?: string;
}
