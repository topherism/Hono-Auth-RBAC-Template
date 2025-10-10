/*
  Fixed migration to safely convert Role.name from TEXT to ENUM
*/

-- 1️⃣ Create the enum type
CREATE TYPE "RoleName" AS ENUM ('superadmin', 'technical', 'admin', 'coordinator', 'borrower', 'viewer');

-- 2️⃣ Alter the existing column to use the new enum, casting text -> enum
ALTER TABLE "Role"
ALTER COLUMN "name" TYPE "RoleName" USING ("name"::text::"RoleName");

-- 3️⃣ Recreate the unique index (if Prisma dropped it before)
CREATE UNIQUE INDEX IF NOT EXISTS "Role_name_key" ON "Role"("name");
