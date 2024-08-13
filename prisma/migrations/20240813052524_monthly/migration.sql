/*
  Warnings:

  - You are about to drop the column `monthlyId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_monthlyId_fkey";

-- AlterTable
ALTER TABLE "Monthly" ADD COLUMN     "products" JSONB[];

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "monthlyId";
