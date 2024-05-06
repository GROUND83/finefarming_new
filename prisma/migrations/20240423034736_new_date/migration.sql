/*
  Warnings:

  - You are about to drop the column `isPossible` on the `ReserVationDate` table. All the data in the column will be lost.
  - Added the required column `startTime` to the `ReserVationDate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReserVationDate" DROP COLUMN "isPossible",
ADD COLUMN     "startTime" TEXT NOT NULL,
ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT true;
