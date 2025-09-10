export const ROLES = {
  SUPERADMIN: 'superadmin',
  TECHNICAL: 'technical',
  ADMIN: 'admin',
  COORDINATOR: 'coordinator',
  BORROWER: 'borrower',
  VIEWER: 'viewer'
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]
