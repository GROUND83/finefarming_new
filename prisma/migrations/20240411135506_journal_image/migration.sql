/*
  Warnings:

  - Made the column `mainImage` on table `Journal` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Journal" ALTER COLUMN "mainImage" SET NOT NULL;
