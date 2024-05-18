/*
  Warnings:

  - Added the required column `detailDescription` to the `Banner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Banner" ADD COLUMN     "detailDescription" TEXT NOT NULL,
ALTER COLUMN "type" SET DEFAULT 'event';
