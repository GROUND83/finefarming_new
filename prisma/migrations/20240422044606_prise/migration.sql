/*
  Warnings:

  - You are about to drop the column `Price` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "Price",
ADD COLUMN     "price" INTEGER;
