export const PERMISSIONS = {
  CREATE_USER: 'create_user',
  UPDATE_USER: 'update_user',
  DELETE_USER: 'delete_user',
  VIEW_REPORTS: 'view_reports',
  MANAGE_USERS: 'manage_users',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]