/*
  Warnings:

  - You are about to drop the column `howto` on the `Product` table. All the data in the column will be lost.
  - The `detail` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `ReserVationDateDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "howto",
ADD COLUMN     "process" TEXT[],
ADD COLUMN     "processNotice" TEXT,
DROP COLUMN "detail",
ADD COLUMN     "detail" JSONB;

-- DropTable
DROP TABLE "ReserVationDateDetail";
