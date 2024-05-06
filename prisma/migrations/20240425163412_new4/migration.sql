/*
  Warnings:

  - Added the required column `priceType` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "priceType" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'waiting';
