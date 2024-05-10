/*
  Warnings:

  - You are about to drop the column `groupPrices` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "groupPrices",
ADD COLUMN     "groupMember" JSONB[];
