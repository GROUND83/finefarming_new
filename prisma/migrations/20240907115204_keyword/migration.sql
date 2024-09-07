-- AlterTable
ALTER TABLE "Magazine" ADD COLUMN     "description" TEXT,
ADD COLUMN     "keywords" TEXT[];

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "keywords" TEXT[];
