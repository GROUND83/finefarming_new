/*
  Warnings:

  - You are about to drop the column `farmId` on the `ReserVationDate` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReserVationDate" DROP CONSTRAINT "ReserVationDate_farmId_fkey";

-- AlterTable
ALTER TABLE "ReserVationDate" DROP COLUMN "farmId";
