/*
  Warnings:

  - A unique constraint covering the columns `[farmId]` on the table `ReserVationDate` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ReserVationDate_farmId_key" ON "ReserVationDate"("farmId");
