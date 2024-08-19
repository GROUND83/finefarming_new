-- AlterTable
ALTER TABLE "Matching" ADD COLUMN     "lastDate" TEXT,
ADD COLUMN     "number" INTEGER,
ADD COLUMN     "preference" TEXT,
ADD COLUMN     "spent" TEXT,
ADD COLUMN     "startDate" TEXT,
ALTER COLUMN "endDate" DROP NOT NULL,
ALTER COLUMN "endDate" DROP DEFAULT,
ALTER COLUMN "endDate" SET DATA TYPE TEXT;
