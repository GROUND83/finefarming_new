/*
  Warnings:

  - A unique constraint covering the columns `[startTime]` on the table `ReserVationDate` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ReserVationDate_farmId_key";

-- CreateIndex
CREATE UNIQUE INDEX "ReserVationDate_startTime_key" ON "ReserVationDate"("startTime");
