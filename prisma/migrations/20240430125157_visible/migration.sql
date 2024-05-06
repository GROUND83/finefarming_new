/*
  Warnings:

  - You are about to drop the column `visble` on the `Review` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "visble",
ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT false;
