/*
  Warnings:

  - The `groupNumber` column on the `Reservation` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `groupPrice` column on the `Reservation` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "groupNumber",
ADD COLUMN     "groupNumber" INTEGER,
DROP COLUMN "groupPrice",
ADD COLUMN     "groupPrice" INTEGER;
