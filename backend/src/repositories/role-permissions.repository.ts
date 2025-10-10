// // src/repositories/role-permission.repository.ts
// import { prisma } from "@/db/client";

// export const RolePermissionRepository = {
//   /** Get all Role-Permission pairs */
//   async getAll() {
//     return prisma.rolePermission.findMany({
//       include: { role: true, permission: true },
//     });
//   },

//   /** Get all default permissions for a given role ID */
//   async getPermissionsByRoleId(roleId: number) {
//     return prisma.rolePermission.findMany({
//       where: { roleId },
//       include: { permission: true },
//     });
//   },

//   /** Optional: Get all roles that have a specific permission */
//   async getRolesByPermissionId(permissionId: number) {
//     return prisma.rolePermission.findMany({
//       where: { permissionId },
//       include: { role: true },
//     });
//   },
// };
