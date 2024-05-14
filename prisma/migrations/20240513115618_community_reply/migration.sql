/*
  Warnings:

  - You are about to drop the column `userId` on the `CommunityReply` table. All the data in the column will be lost.
  - Added the required column `authorAvatar` to the `CommunityReply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `CommunityReply` table without a default value. This is not possible if the table is not empty.
  - Made the column `authorName` on table `CommunityReply` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CommunityReply" DROP CONSTRAINT "CommunityReply_userId_fkey";

-- AlterTable
ALTER TABLE "CommunityReply" DROP COLUMN "userId",
ADD COLUMN     "authorAvatar" TEXT NOT NULL,
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "parentId" INTEGER,
ALTER COLUMN "authorName" SET NOT NULL;
