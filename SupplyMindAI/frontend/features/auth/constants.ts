/**
 * Auth feature constants: roles, labels, permissions.
 */

export const USER_ROLES = [
  'super_admin',
  'org_admin',
  'procurement_manager',
  'inventory_manager',
  'logistics_coordinator',
  'finance_analyst',
  'viewer',
] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: 'Super Admin',
  org_admin: 'Organization Admin',
  procurement_manager: 'Procurement Manager',
  inventory_manager: 'Inventory Manager',
  logistics_coordinator: 'Logistics Coordinator',
  finance_analyst: 'Finance Analyst',
  viewer: 'Viewer',
};

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  super_admin: ['*'],
  org_admin: [
    'dashboard',
    'procurement',
    'inventory',
    'logistics',
    'vendors',
    'analytics',
    'ai',
    'settings',
    'users',
  ],
  procurement_manager: [
    'dashboard',
    'procurement',
    'vendors',
    'analytics',
    'ai',
  ],
  inventory_manager: [
    'dashboard',
    'inventory',
    'analytics',
    'ai',
  ],
  logistics_coordinator: [
    'dashboard',
    'logistics',
    'inventory',
    'analytics',
    'ai',
  ],
  finance_analyst: [
    'dashboard',
    'analytics',
    'procurement',
    'ai',
  ],
  viewer: ['dashboard', 'analytics'],
};

export const ROLE_SELECT_OPTIONS = USER_ROLES.map((role) => ({
  value: role,
  label: ROLE_LABELS[role],
}));
