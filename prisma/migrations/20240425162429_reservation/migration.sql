/*
  Warnings:

  - You are about to drop the column `peoples` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `userPhone` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `checkInTime` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "peoples",
DROP COLUMN "userEmail",
DROP COLUMN "userPhone",
ADD COLUMN     "checkInTime" TEXT NOT NULL,
ADD COLUMN     "groupNumber" TEXT,
ADD COLUMN     "groupPrice" TEXT,
ADD COLUMN     "personalPrice" JSONB[],
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "visitor" TEXT,
ADD COLUMN     "visitorPhone" TEXT;
