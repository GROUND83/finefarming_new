/*
  Warnings:

  - You are about to drop the column `visble` on the `CommunityReply` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CommunityReply" DROP COLUMN "visble",
ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT false;
