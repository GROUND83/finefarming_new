/*
  Warnings:

  - Made the column `fridayEnd` on table `Farm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fridayStart` on table `Farm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `holidayEnd` on table `Farm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `holidayStart` on table `Farm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mondayEnd` on table `Farm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mondayStart` on table `Farm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `saturdayEnd` on table `Farm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `saturdayStart` on table `Farm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sundayEnd` on table `Farm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sundayStart` on table `Farm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `thursdayEnd` on table `Farm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `thursdayStart` on table `Farm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tuesdayEnd` on table `Farm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tuesdayStart` on table `Farm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `wednesdayEnd` on table `Farm` required. This step will fail if there are existing NULL values in that column.
  - Made the column `wednesdayStart` on table `Farm` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Farm" ALTER COLUMN "fridayEnd" SET NOT NULL,
ALTER COLUMN "fridayEnd" SET DEFAULT '18:00',
ALTER COLUMN "fridayStart" SET NOT NULL,
ALTER COLUMN "fridayStart" SET DEFAULT '9:00',
ALTER COLUMN "holidayEnd" SET NOT NULL,
ALTER COLUMN "holidayEnd" SET DEFAULT '18:00',
ALTER COLUMN "holidayStart" SET NOT NULL,
ALTER COLUMN "holidayStart" SET DEFAULT '9:00',
ALTER COLUMN "mondayEnd" SET NOT NULL,
ALTER COLUMN "mondayEnd" SET DEFAULT '18:00',
ALTER COLUMN "mondayStart" SET NOT NULL,
ALTER COLUMN "mondayStart" SET DEFAULT '9:00',
ALTER COLUMN "saturdayEnd" SET NOT NULL,
ALTER COLUMN "saturdayEnd" SET DEFAULT '18:00',
ALTER COLUMN "saturdayStart" SET NOT NULL,
ALTER COLUMN "saturdayStart" SET DEFAULT '9:00',
ALTER COLUMN "sundayEnd" SET NOT NULL,
ALTER COLUMN "sundayEnd" SET DEFAULT '18:00',
ALTER COLUMN "sundayStart" SET NOT NULL,
ALTER COLUMN "sundayStart" SET DEFAULT '9:00',
ALTER COLUMN "thursdayEnd" SET NOT NULL,
ALTER COLUMN "thursdayEnd" SET DEFAULT '18:00',
ALTER COLUMN "thursdayStart" SET NOT NULL,
ALTER COLUMN "thursdayStart" SET DEFAULT '9:00',
ALTER COLUMN "tuesdayEnd" SET NOT NULL,
ALTER COLUMN "tuesdayEnd" SET DEFAULT '18:00',
ALTER COLUMN "tuesdayStart" SET NOT NULL,
ALTER COLUMN "tuesdayStart" SET DEFAULT '9:00',
ALTER COLUMN "wednesdayEnd" SET NOT NULL,
ALTER COLUMN "wednesdayEnd" SET DEFAULT '18:00',
ALTER COLUMN "wednesdayStart" SET NOT NULL,
ALTER COLUMN "wednesdayStart" SET DEFAULT '9:00';
