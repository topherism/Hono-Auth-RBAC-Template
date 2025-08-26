export const ROLES = {
  ADMIN: 'admin',
  COORDINATOR: 'coordinator',
  VIEWER: 'viewer'
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]
