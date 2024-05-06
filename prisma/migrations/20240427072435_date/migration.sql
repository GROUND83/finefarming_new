/*
  Warnings:

  - You are about to drop the column `date` on the `Holiday` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[locdate]` on the table `Holiday` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `day` to the `Holiday` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locdate` to the `Holiday` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Holiday` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Holiday` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Holiday" DROP COLUMN "date",
ADD COLUMN     "day" TEXT NOT NULL,
ADD COLUMN     "locdate" TEXT NOT NULL,
ADD COLUMN     "month" TEXT NOT NULL,
ADD COLUMN     "year" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Holiday_locdate_key" ON "Holiday"("locdate");
