/*
  Warnings:

  - You are about to drop the `SubBaseProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubBaseProduct" DROP CONSTRAINT "SubBaseProduct_productId_fkey";

-- DropTable
DROP TABLE "SubBaseProduct";

-- CreateTable
CREATE TABLE "BaseProduct" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "mainImage" TEXT,
    "images" TEXT[],
    "detail" TEXT,
    "priceType" "PriceType" NOT NULL DEFAULT 'GROUP',
    "Price" INTEGER,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "BaseProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BaseProduct_productId_key" ON "BaseProduct"("productId");

-- AddForeignKey
ALTER TABLE "BaseProduct" ADD CONSTRAINT "BaseProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
