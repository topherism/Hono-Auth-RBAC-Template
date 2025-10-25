export const PERMISSIONS = {
  CREATE_USER: 'create_user',
  VIEW_USER: 'view_user',
  UPDATE_USER: 'update_user',
  DELETE_USER: 'delete_user',
  MANAGE_USERS: 'manage_users',
  VIEW_REPORTS: 'view_reports',
  VIEW_ROLE_PERMISSIONS: 'view_role_permissions',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]