/*
  Warnings:

  - The primary key for the `UserRole` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId]` on the table `UserRole` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."UserRole" DROP CONSTRAINT "UserRole_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_userId_key" ON "public"."UserRole"("userId");
