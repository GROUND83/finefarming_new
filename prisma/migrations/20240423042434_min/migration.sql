/*
  Warnings:

  - Made the column `reservationMax` on table `Farm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reservationMin` on table `Farm` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Farm" ALTER COLUMN "reservationMax" SET NOT NULL,
ALTER COLUMN "reservationMin" SET NOT NULL;
