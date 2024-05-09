/*
  Warnings:

  - You are about to drop the column `strignDate` on the `ReserVationDate` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Farmer_phone_key";

-- DropIndex
DROP INDEX "Manager_phone_key";

-- DropIndex
DROP INDEX "SuperManager_phone_key";

-- DropIndex
DROP INDEX "User_phone_key";

-- DropIndex
DROP INDEX "Writer_phone_key";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "personalPrice" SET DEFAULT ARRAY['{ "isFree": false ,"startAge": "0" ,"endAge": "1", "price": "0","message": ""}']::JSONB[];

-- AlterTable
ALTER TABLE "ReserVationDate" DROP COLUMN "strignDate";
