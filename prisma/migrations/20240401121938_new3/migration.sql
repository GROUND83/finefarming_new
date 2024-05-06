-- CreateEnum
CREATE TYPE "ParkingType" AS ENUM ('free', 'paid', 'noPark');

-- AlterTable
ALTER TABLE "Farm" ADD COLUMN     "cloth" TEXT,
ADD COLUMN     "friday" JSONB,
ADD COLUMN     "holiday" JSONB,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "mainImage" TEXT,
ADD COLUMN     "monday" JSONB,
ADD COLUMN     "parking" "ParkingType",
ADD COLUMN     "parkinngFee" TEXT,
ADD COLUMN     "pet" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "policy" TEXT,
ADD COLUMN     "refundPolicy" TEXT,
ADD COLUMN     "saturday" JSONB,
ADD COLUMN     "sunday" JSONB,
ADD COLUMN     "thursday" JSONB,
ADD COLUMN     "tuesday" JSONB,
ADD COLUMN     "wednesday" JSONB;

-- CreateTable
CREATE TABLE "Facility" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "farmId" INTEGER NOT NULL,

    CONSTRAINT "Facility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tool" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "farmId" INTEGER NOT NULL,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReserVationDate" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "farmId" INTEGER NOT NULL,

    CONSTRAINT "ReserVationDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReserVationDateDetail" (
    "id" SERIAL NOT NULL,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "start" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "reservationDateId" INTEGER NOT NULL,

    CONSTRAINT "ReserVationDateDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Facility" ADD CONSTRAINT "Facility_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReserVationDate" ADD CONSTRAINT "ReserVationDate_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReserVationDateDetail" ADD CONSTRAINT "ReserVationDateDetail_reservationDateId_fkey" FOREIGN KEY ("reservationDateId") REFERENCES "ReserVationDate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
