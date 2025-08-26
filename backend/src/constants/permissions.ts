export const PERMISSIONS = {
  CREATE_KIT: 'create_kit',
  UPDATE_KIT: 'update_kit',
  DELETE_KIT: 'delete_kit',
  VIEW_REPORTS: 'view_reports',
  MANAGE_USERS: 'manage_users'
} as const

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]