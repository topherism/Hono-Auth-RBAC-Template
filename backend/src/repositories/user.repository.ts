import { prisma } from "@/lib/prisma";
import type { User, UserInfo } from "@prisma/client";

export type UserWithInfo = User & { userInfo: UserInfo };


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

  async findUserByUsername(username?: string | null): Promise<User | null> {
    if (!username) return null;
    return prisma.user.findUnique({ where: { username } });
  },

  async findAll() {
    return prisma.user.findMany({
      include: {
        userInfo: true, // include profile (1:1)
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
};
