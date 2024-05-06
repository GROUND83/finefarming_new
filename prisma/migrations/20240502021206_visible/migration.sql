-- AlterTable
ALTER TABLE "Magazine" ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "optionProduct" JSONB[];

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "approve" SET DEFAULT true;
