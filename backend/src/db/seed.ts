import { prisma } from "./client";
import { seedRolesAndPermissions } from "./seeds/roles-permissions";
import { seedSuperAdmin } from "./seeds/superadmin-technical";

async function main() {
  console.log("🌱 Starting database seed...");

  await seedRolesAndPermissions();
  await seedSuperAdmin();
  // later you can add more:
  // await seedUsers();
  // await seedDemoData();

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
