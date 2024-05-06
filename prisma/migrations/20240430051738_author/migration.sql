-- CreateEnum
CREATE TYPE "CommunityAuthor" AS ENUM ('manager', 'user');

-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "autherId" INTEGER,
ADD COLUMN     "authorName" TEXT,
ADD COLUMN     "authorType" "CommunityAuthor" NOT NULL DEFAULT 'manager';
