/*
  Warnings:

  - You are about to drop the column `essential` on the `SubOptionSelectProduct` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SubOptionProduct" ADD COLUMN     "howto" TEXT,
ALTER COLUMN "essential" SET DEFAULT true;

-- AlterTable
ALTER TABLE "SubOptionSelectProduct" DROP COLUMN "essential",
ADD COLUMN     "howto" TEXT;
