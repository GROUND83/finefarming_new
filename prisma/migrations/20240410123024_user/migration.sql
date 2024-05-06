/*
  Warnings:

  - Added the required column `provider` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProviderType" AS ENUM ('email', 'kakao', 'naver');

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" "ProviderType" NOT NULL,
ALTER COLUMN "username" DROP NOT NULL;
