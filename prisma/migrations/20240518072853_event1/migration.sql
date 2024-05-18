/*
  Warnings:

  - You are about to drop the column `period` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "period",
DROP COLUMN "type",
ALTER COLUMN "image" DROP NOT NULL;
