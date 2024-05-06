/*
  Warnings:

  - A unique constraint covering the columns `[initail]` on the table `Farm` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Farm_initail_key" ON "Farm"("initail");
