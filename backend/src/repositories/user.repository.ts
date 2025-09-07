import { prisma } from "@/lib/prisma";
import type { User, UserInfo } from "@prisma/client";

export type UserWithInfo = User & { userInfo: UserInfo | null};

export const UserRepository = {
  async createUserWithInfo(input: {
    email: string;
    password: string;
    username?: string | null;
    first_name: string;
    middle_name?: string | null;
    last_name: string;
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
      },
      include: { userInfo: true },
    });

    // At runtime, userInfo is guaranteed because you always create it
    return user as UserWithInfo;
  },

  async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  },

  async findUserWithInfoById(id: string): Promise<UserWithInfo | null> {
    return prisma.user.findFirst({
      include: {
        userInfo: true,
      },
      where: { id },
    });
  },

  async findUserByUsername(username?: string | null): Promise<User | null> {
    if (!username) return null;
    return prisma.user.findUnique({ where: { username } });
  },

  async findAllUserWithInfo() {
    return prisma.user.findMany({
      include: {
        userInfo: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
};
