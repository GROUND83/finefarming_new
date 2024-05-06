/*
  Warnings:

  - You are about to drop the `SubOptionSelectProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubOptionSelectProduct" DROP CONSTRAINT "SubOptionSelectProduct_subOptionProductId_fkey";

-- AlterTable
ALTER TABLE "SubOptionProduct" ADD COLUMN     "selectProducts" JSONB[];

-- DropTable
DROP TABLE "SubOptionSelectProduct";
