/*
  Warnings:

  - Added the required column `totalAmount` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "totalAmount" INTEGER NOT NULL;
