/*
  Warnings:

  - You are about to drop the column `authBackImage` on the `Magazine` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Magazine` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Magazine" DROP COLUMN "authBackImage",
DROP COLUMN "description";
