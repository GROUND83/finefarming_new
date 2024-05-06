/*
  Warnings:

  - You are about to drop the column `reservationDateId` on the `ReserVationDateDetail` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReserVationDateDetail" DROP CONSTRAINT "ReserVationDateDetail_reservationDateId_fkey";

-- AlterTable
ALTER TABLE "ReserVationDateDetail" DROP COLUMN "reservationDateId";
