/*
  Warnings:

  - You are about to drop the column `farmId` on the `Facility` table. All the data in the column will be lost.
  - You are about to drop the column `farmType` on the `Farm` table. All the data in the column will be lost.
  - You are about to drop the column `farmId` on the `FarmItem` table. All the data in the column will be lost.
  - You are about to drop the column `farmId` on the `Tool` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Facility" DROP CONSTRAINT "Facility_farmId_fkey";

-- DropForeignKey
ALTER TABLE "FarmItem" DROP CONSTRAINT "FarmItem_farmId_fkey";

-- DropForeignKey
ALTER TABLE "Tool" DROP CONSTRAINT "Tool_farmId_fkey";

-- AlterTable
ALTER TABLE "Facility" DROP COLUMN "farmId";

-- AlterTable
ALTER TABLE "Farm" DROP COLUMN "farmType",
ADD COLUMN     "educationData" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "educationSubject" TEXT[],
ADD COLUMN     "educationTitle" TEXT,
ADD COLUMN     "facilities" JSONB[],
ADD COLUMN     "farmInsideType" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "farmItems" JSONB[],
ADD COLUMN     "farmOutSideType" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "tools" JSONB[];

-- AlterTable
ALTER TABLE "FarmItem" DROP COLUMN "farmId";

-- AlterTable
ALTER TABLE "Tool" DROP COLUMN "farmId";
