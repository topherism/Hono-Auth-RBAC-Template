import { prisma } from "@/db/client";
import type { Prisma, RoleName, User, UserInfo } from "@prisma/client";

// Remove the password from User
export type UserWithInfo = User & {
  userInfo: UserInfo | null;
};

export const UserRepository = {
  async createUserWithInfo(input: {
    email: string;
    password: string;
    username?: string | null;
    first_name: string;
    middle_name?: string | null;
    last_name: string;
    role: RoleName;
  }): Promise<UserWithInfo> {
    const user = await prisma.user.create({
      data: {
        email: input.email,
        username: input.username,
        password: input.password,
        role: input.role,
        userInfo: {
          create: {
            firstName: input.first_name,
            middleName: input.middle_name,
            lastName: input.last_name,
          },
        },
      },
      include: {
        userInfo: true,
      },
    });

    // At runtime, userInfo is guaranteed because you always create it
    return user as UserWithInfo;
  },

  async updateUser(id: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: { id },
      data,
      include: {
        userInfo: true,
        roleInfo: true,
      },
    });
  },

  async incrementTokenVersion(userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { tokenVersion: { increment: 1 } },
    });
  },

  async findAllUserWithInfo() {
    const users = await prisma.user.findMany({
      include: {
        userInfo: true,
      },
    });

    return users;
  },

  async findUserWithInfoById(id: string): Promise<UserWithInfo | null> {
    const user = await prisma.user.findFirst({
      include: {
        userInfo: true,
      },
      where: { id },
    });

    if (!user) return null;

    return user;
  },

  async findUserWithInfoByEmail(email: string): Promise<UserWithInfo | null> {
    const user = await prisma.user.findFirst({
      include: {
        userInfo: true,
      },
      where: { email },
    });

    if (!user) return null;

    return user;
  },

  async findUserWithInfoByUsername(
    username?: string | null
  ): Promise<UserWithInfo | null> {
    const user = await prisma.user.findFirst({
      include: {
        userInfo: true,
      },
      where: { username },
    });

    if (!user) return null;

    return user;
  },
};
