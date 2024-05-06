/*
  Warnings:

  - The `groupPrice` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `groupLimit` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Farm" ALTER COLUMN "slot" SET DEFAULT ARRAY['{ "visible": true ,"startTime": "8:00" ,"amount": "3"}']::JSONB[];

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "groupPrice",
ADD COLUMN     "groupPrice" INTEGER NOT NULL DEFAULT 10000,
ALTER COLUMN "personalPrice" SET DEFAULT ARRAY['{ "isFree": true ,"starAge":1 ,"endAge": 3,"message": ""}']::JSONB[],
ALTER COLUMN "groupLimit" SET NOT NULL,
ALTER COLUMN "groupLimit" SET DEFAULT 5;
