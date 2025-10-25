export const PERMISSIONS = {
  CREATE_USER: "create_user",
  PATCH_USER: "patch_user",
  DELETE_USER: "delete_user",
  VIEW_USER: "view_user",
  VIEW_ONE_USER: "view_one_user",
  PATCH_USER_ROLE: "PATCH_user_role",
  VIEW_ROLE_PERMISSIONS: "view_role_permissions",
  PATCH_ROLE_PERMISSIONS: "patch_role_permissions",
  VIEW_USER_ROLE_PERMISSIONS: "view_user_role_permissions",
  GRANT_USER_PERMISSIONS: "grant_user_permissions",
  DENY_USER_PERMISSIONS: "deny_user_permissions",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
