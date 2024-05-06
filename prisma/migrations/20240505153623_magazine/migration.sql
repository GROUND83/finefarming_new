/*
  Warnings:

  - You are about to drop the column `mainImage` on the `Magazine` table. All the data in the column will be lost.
  - You are about to drop the column `richText` on the `Magazine` table. All the data in the column will be lost.
  - Added the required column `authBackImage` to the `Magazine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Magazine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Magazine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Magazine" DROP COLUMN "mainImage",
DROP COLUMN "richText",
ADD COLUMN     "authBackImage" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "sections" JSONB[],
ADD COLUMN     "suggestion" JSONB[];

-- AddForeignKey
ALTER TABLE "Magazine" ADD CONSTRAINT "Magazine_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
