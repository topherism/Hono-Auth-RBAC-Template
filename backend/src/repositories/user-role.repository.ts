// // src/repositories/user-role.repository.ts
// import { prisma } from "@/db/client";
// import {type Role} from "@/constants/roles";

// export const UserRoleRepository = {
//   async assignUserRole(userId: string, role: Role) {
//     const userRole = await prisma.userRole.create({
//       data: {
//         user: { connect: { id: userId } },
//         role: { connect: { name: role } },
//       },
//     });

//     return userRole;
//   },

//   async getRoleNameByUserId(userId: string){
//     return prisma.userRole.findFirst({
//       where: { userId },
//       include: { role: true },
//     });
//   }
// };
