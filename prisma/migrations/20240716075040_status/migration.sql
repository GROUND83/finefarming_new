-- CreateEnum
CREATE TYPE "ProductStatusType" AS ENUM ('POSSIBLE', 'FINISHED', 'TESTING');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "status" "ProductStatusType" NOT NULL DEFAULT 'POSSIBLE';
