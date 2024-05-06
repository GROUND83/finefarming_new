/*
  Warnings:

  - You are about to drop the column `kakaoId` on the `Writer` table. All the data in the column will be lost.
  - You are about to drop the column `naverId` on the `Writer` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `Writer` table. All the data in the column will be lost.
  - You are about to drop the `Journal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Journal" DROP CONSTRAINT "Journal_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Journal" DROP CONSTRAINT "Journal_farmId_fkey";

-- DropIndex
DROP INDEX "Writer_kakaoId_key";

-- DropIndex
DROP INDEX "Writer_naverId_key";

-- AlterTable
ALTER TABLE "Writer" DROP COLUMN "kakaoId",
DROP COLUMN "naverId",
DROP COLUMN "provider";

-- DropTable
DROP TABLE "Journal";

-- CreateTable
CREATE TABLE "Magazine" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER NOT NULL,
    "farmId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "richText" TEXT,
    "mainImage" TEXT NOT NULL,

    CONSTRAINT "Magazine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Magazine" ADD CONSTRAINT "Magazine_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Writer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Magazine" ADD CONSTRAINT "Magazine_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
