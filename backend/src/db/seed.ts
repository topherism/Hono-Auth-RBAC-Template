import { prisma } from "./client";
import { seedRolesAndPermissions } from "./seeds/roles-permissions";
import { seedSuperAdminAndTechnical } from "./seeds/superadmin-technical";

async function main() {
  console.log("🌱 Starting database seed...");

  await seedRolesAndPermissions();
  await seedSuperAdminAndTechnical();

  console.log("🌱 Seeding finished.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
