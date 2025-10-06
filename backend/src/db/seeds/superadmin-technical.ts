import { prisma } from "../client";
import { BcryptHelper } from "@/utils/hash";
import { ROLES } from "@/constants/roles";
import envConfig from "@/env";
import { logger } from "@/utils/logger";
import { UserRepository } from "@/repositories/user.repository";

export async function seedSuperAdmin() {
  const superAdminEmail = envConfig.SUPERADMIN_EMAIL;
  const superAdminUsername = envConfig.SUPERADMIN_USERNAME;
  const superAdminPassword = envConfig.SUPERADMIN_TEMP_PASSWORD; // ⚠️ Change after first login!

  let superAdmin = await UserRepository.findUserWithInfoByEmail(
    superAdminEmail
  );

  // If not found by email, check by username
  if (!superAdmin) {
    superAdmin = await UserRepository.findUserWithInfoByUsername(
      superAdminUsername
    );
  }

  if (!superAdmin) {
    logger.info("👑 Creating Super Admin account...");

    const hashedPassword = await BcryptHelper.hash(superAdminPassword);

    await prisma.user.create({
      data: {
        email: superAdminEmail,
        username: superAdminUsername,
        password: hashedPassword,
        isSystem: true, // 🚨 mark as system account
        roles: {
          create: {
            role: {
              connect: { name: ROLES.SUPERADMIN }, // attach Admin role
            },
          },
        },
        userInfo: {
          create: {
            firstName: "Super",
            lastName: "Admin",
          },
        },
      },
    });

    logger.info("✅ Super Admin account created.");
  } else {
    logger.info("SUPERADMIN already exists.");
  }
}
