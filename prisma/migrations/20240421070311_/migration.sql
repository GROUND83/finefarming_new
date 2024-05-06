/*
  Warnings:

  - You are about to drop the `BaseProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BaseProduct" DROP CONSTRAINT "BaseProduct_productId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "Price" INTEGER,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "detail" TEXT,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "mainImage" TEXT,
ADD COLUMN     "priceType" "PriceType" NOT NULL DEFAULT 'GROUP',
ADD COLUMN     "title" TEXT;

-- DropTable
DROP TABLE "BaseProduct";
