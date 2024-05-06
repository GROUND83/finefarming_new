/*
  Warnings:

  - You are about to drop the column `educationId` on the `Farm` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Farm" DROP CONSTRAINT "Farm_educationId_fkey";

-- DropIndex
DROP INDEX "Farm_educationId_key";

-- AlterTable
ALTER TABLE "Farm" DROP COLUMN "educationId";
