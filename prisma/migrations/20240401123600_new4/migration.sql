/*
  Warnings:

  - Added the required column `updated_at` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `EducationSubject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Facility` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reservationMax` to the `Farm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reservationMin` to the `Farm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Farm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `FarmItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `ReserVationDate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `ReserVationDateDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Tool` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('waiting', 'complte', 'cancle');

-- CreateEnum
CREATE TYPE "ReservationDoneStatus" AS ENUM ('complte', 'noshow');

-- AlterTable
ALTER TABLE "Education" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "EducationSubject" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Facility" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Farm" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "initail" TEXT,
ADD COLUMN     "reservationMax" INTEGER NOT NULL,
ADD COLUMN     "reservationMin" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "FarmItem" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ReserVationDate" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isPossible" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ReserVationDateDetail" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Tool" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "reservationNumber" TEXT NOT NULL,
    "farmId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "peoples" INTEGER NOT NULL,
    "totalprice" INTEGER NOT NULL,
    "status" "ReservationStatus" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "reservationDoneStatus" "ReservationDoneStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
