/*
  Warnings:

  - The values [complte] on the enum `ReservationStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `date` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `reservationDoneStatus` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `checkInDate` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReservationStatus_new" AS ENUM ('waiting', 'complete', 'cancle', 'done', 'noshow');
ALTER TABLE "Reservation" ALTER COLUMN "status" TYPE "ReservationStatus_new" USING ("status"::text::"ReservationStatus_new");
ALTER TYPE "ReservationStatus" RENAME TO "ReservationStatus_old";
ALTER TYPE "ReservationStatus_new" RENAME TO "ReservationStatus";
DROP TYPE "ReservationStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "date",
DROP COLUMN "reservationDoneStatus",
ADD COLUMN     "checkInDate" TIMESTAMP(3) NOT NULL;

-- DropEnum
DROP TYPE "ReservationDoneStatus";
