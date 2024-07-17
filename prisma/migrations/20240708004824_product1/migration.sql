/*
  Warnings:

  - Added the required column `productId` to the `ReserVationDate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReserVationDate" ADD COLUMN     "productId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ReserVationDate" ADD CONSTRAINT "ReserVationDate_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
