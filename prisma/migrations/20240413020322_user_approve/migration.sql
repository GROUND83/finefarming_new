-- AlterTable
ALTER TABLE "Farmer" ADD COLUMN     "approve" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Manager" ADD COLUMN     "approve" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "approve" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Writer" ADD COLUMN     "approve" BOOLEAN NOT NULL DEFAULT false;
