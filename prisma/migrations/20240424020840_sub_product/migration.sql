/*
  Warnings:

  - You are about to drop the column `Price` on the `SubOptionProduct` table. All the data in the column will be lost.
  - You are about to drop the column `detail` on the `SubOptionProduct` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `SubOptionProduct` table. All the data in the column will be lost.
  - You are about to drop the column `mainImage` on the `SubOptionProduct` table. All the data in the column will be lost.
  - You are about to drop the column `productType` on the `SubOptionProduct` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ReserVationDate" ADD COLUMN     "strignDate" TEXT;

-- AlterTable
ALTER TABLE "SubOptionProduct" DROP COLUMN "Price",
DROP COLUMN "detail",
DROP COLUMN "images",
DROP COLUMN "mainImage",
DROP COLUMN "productType",
ADD COLUMN     "essential" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "groupLimit" INTEGER,
ADD COLUMN     "groupPrice" INTEGER,
ADD COLUMN     "personalPrice" JSONB[];
