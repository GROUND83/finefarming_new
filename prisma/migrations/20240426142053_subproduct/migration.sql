/*
  Warnings:

  - You are about to drop the column `magazineUrl` on the `Farm` table. All the data in the column will be lost.
  - You are about to drop the column `magazineVisible` on the `Farm` table. All the data in the column will be lost.
  - You are about to drop the column `policy` on the `Farm` table. All the data in the column will be lost.
  - You are about to drop the column `groupLimit` on the `SubOptionProduct` table. All the data in the column will be lost.
  - You are about to drop the column `groupPrice` on the `SubOptionProduct` table. All the data in the column will be lost.
  - You are about to drop the column `howto` on the `SubOptionProduct` table. All the data in the column will be lost.
  - You are about to drop the column `personalPrice` on the `SubOptionProduct` table. All the data in the column will be lost.
  - You are about to drop the column `priceType` on the `SubOptionProduct` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Farm" DROP COLUMN "magazineUrl",
DROP COLUMN "magazineVisible",
DROP COLUMN "policy";

-- AlterTable
ALTER TABLE "SubOptionProduct" DROP COLUMN "groupLimit",
DROP COLUMN "groupPrice",
DROP COLUMN "howto",
DROP COLUMN "personalPrice",
DROP COLUMN "priceType",
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 10000;

-- CreateTable
CREATE TABLE "SubOptionSelectProduct" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "essential" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 1,
    "price" INTEGER NOT NULL DEFAULT 10000,
    "subOptionProductId" INTEGER NOT NULL,

    CONSTRAINT "SubOptionSelectProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubOptionSelectProduct" ADD CONSTRAINT "SubOptionSelectProduct_subOptionProductId_fkey" FOREIGN KEY ("subOptionProductId") REFERENCES "SubOptionProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;
