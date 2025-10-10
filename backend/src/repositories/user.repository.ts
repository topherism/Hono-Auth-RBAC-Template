import { prisma } from "@/db/client";
import type { RoleName, User, UserInfo } from "@prisma/client";

// Remove the password from User
export type SafeUser = Omit<User, "password" | "changedPasswordAt">;

export type UserWithInfo = SafeUser & {
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

  async findAllUserWithInfo() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        isSystem: true,
        isActive: true,
        role: true,
        userInfo: true,
      },
    });

    return users;
  },

  async findUserWithInfoById(id: string): Promise<UserWithInfo | null> {
    const user = await prisma.user.findFirst({
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        changedPasswordAt: true,
        isSystem: true,
        isActive: true,
        userInfo: true,
        role: true,
      },
      where: { id },
    });

    if (!user) return null;

    return user;
  },

  async findUserWithInfoByEmail(email: string): Promise<UserWithInfo | null> {
    const user = await prisma.user.findFirst({
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        changedPasswordAt: true,
        isSystem: true,
        isActive: true,
        userInfo: true,
        role: true,
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
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        changedPasswordAt: true,
        isSystem: true,
        isActive: true,
        userInfo: true,
        role: true,
      },
      where: { username },
    });

    if (!user) return null;

    return user;
  },
};
