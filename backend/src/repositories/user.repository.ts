import { prisma } from "@/db/client";
import type { RoleName, User, UserInfo } from "@prisma/client";

// Remove the password from User
export type SafeUser = Omit<User, "password">;

export type UserWithInfo = SafeUser & {
  userInfo: UserInfo | null;
  role: RoleName | null;
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
        userInfo: {
          create: {
            firstName: input.first_name,
            middleName: input.middle_name,
            lastName: input.last_name,
          },
        },
        role: {
          create: {
            role: {
              connect: { name: input.role },
            },
          },
        },
      },
      include: {
        userInfo: true,
        role: {
          select: {
            role: { select: { name: true } },
          },
        },
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
        userInfo: true,
        role: {
          select: {
            role: {
              select: { name: true },
            },
          },
        },
      },
    });

    // Flatten the role structure
    return users.map((user) => ({
      ...user,
      role: user.role?.role.name ?? null,
    }));
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
        role: {
          select: {
            role: {
              select: { name: true },
            },
          },
        },
      },
      where: { id },
    });

    if (!user) return null;

    const { role, ...rest } = user;

    return {
      ...rest,
      role: role?.role.name ?? null, // flatten safely
    };
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
        role: {
          select: {
            role: {
              select: { name: true },
            },
          },
        },
      },
      where: { email },
    });

    if (!user) return null;

    const { role, ...rest } = user;

    return {
      ...rest,
      role: role?.role.name ?? null, // flatten safely
    };
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
        role: {
          select: {
            role: {
              select: { name: true },
            },
          },
        },
      },
      where: { username },
    });

    if (!user) return null;

    const { role, ...rest } = user;

    return {
      ...rest,
      role: role?.role.name ?? null, // flatten safely
    };
  },
};
