/*
  Warnings:

  - You are about to drop the column `friday` on the `Farm` table. All the data in the column will be lost.
  - You are about to drop the column `holiday` on the `Farm` table. All the data in the column will be lost.
  - You are about to drop the column `monday` on the `Farm` table. All the data in the column will be lost.
  - You are about to drop the column `saturday` on the `Farm` table. All the data in the column will be lost.
  - You are about to drop the column `sunday` on the `Farm` table. All the data in the column will be lost.
  - You are about to drop the column `thursday` on the `Farm` table. All the data in the column will be lost.
  - You are about to drop the column `tuesday` on the `Farm` table. All the data in the column will be lost.
  - You are about to drop the column `wednesday` on the `Farm` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Farm" DROP COLUMN "friday",
DROP COLUMN "holiday",
DROP COLUMN "monday",
DROP COLUMN "saturday",
DROP COLUMN "sunday",
DROP COLUMN "thursday",
DROP COLUMN "tuesday",
DROP COLUMN "wednesday",
ADD COLUMN     "fridayEnd" TEXT,
ADD COLUMN     "fridayOpen" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "fridayStart" TEXT,
ADD COLUMN     "holidayEnd" TEXT,
ADD COLUMN     "holidayOpen" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "holidayStart" TEXT,
ADD COLUMN     "mondayEnd" TEXT,
ADD COLUMN     "mondayOpen" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mondayStart" TEXT,
ADD COLUMN     "saturdayEnd" TEXT,
ADD COLUMN     "saturdayOpen" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "saturdayStart" TEXT,
ADD COLUMN     "sundayEnd" TEXT,
ADD COLUMN     "sundayOpen" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sundayStart" TEXT,
ADD COLUMN     "thursdayEnd" TEXT,
ADD COLUMN     "thursdayOpen" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "thursdayStart" TEXT,
ADD COLUMN     "tuesdayEnd" TEXT,
ADD COLUMN     "tuesdayOpen" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tuesdayStart" TEXT,
ADD COLUMN     "wednesdayEnd" TEXT,
ADD COLUMN     "wednesdayOpen" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "wednesdayStart" TEXT;
