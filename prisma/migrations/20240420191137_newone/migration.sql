/*
  Warnings:

  - You are about to drop the column `cloth` on the `Farm` table. All the data in the column will be lost.
  - You are about to drop the column `educationData` on the `Farm` table. All the data in the column will be lost.
  - You are about to drop the column `educationSubject` on the `Farm` table. All the data in the column will be lost.
  - You are about to drop the column `educationTitle` on the `Farm` table. All the data in the column will be lost.
  - You are about to drop the column `farmInsideType` on the `Farm` table. All the data in the column will be lost.
  - You are about to drop the column `farmOutSideType` on the `Farm` table. All the data in the column will be lost.
  - You are about to drop the column `tools` on the `Farm` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PriceType" AS ENUM ('GROUP', 'PERSONAL');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('MANDATORY', 'SELECT');

-- AlterTable
ALTER TABLE "Farm" DROP COLUMN "cloth",
DROP COLUMN "educationData",
DROP COLUMN "educationSubject",
DROP COLUMN "educationTitle",
DROP COLUMN "farmInsideType",
DROP COLUMN "farmOutSideType",
DROP COLUMN "tools";

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "farmInsideType" BOOLEAN NOT NULL DEFAULT true,
    "farmOutSideType" BOOLEAN NOT NULL DEFAULT true,
    "tools" JSONB[],
    "cloth" TEXT,
    "educationTitle" TEXT,
    "educationData" BOOLEAN NOT NULL DEFAULT true,
    "educationSubject" TEXT[],

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubBaseProduct" (
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

    CONSTRAINT "SubBaseProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubOptionProduct" (
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
    "productType" "ProductType" NOT NULL DEFAULT 'MANDATORY',
    "productId" INTEGER NOT NULL,

    CONSTRAINT "SubOptionProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubBaseProduct_productId_key" ON "SubBaseProduct"("productId");

-- AddForeignKey
ALTER TABLE "SubBaseProduct" ADD CONSTRAINT "SubBaseProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubOptionProduct" ADD CONSTRAINT "SubOptionProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
