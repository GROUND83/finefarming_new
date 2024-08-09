-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "monthlyId" INTEGER;

-- CreateTable
CREATE TABLE "Monthly" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "month" TEXT NOT NULL,

    CONSTRAINT "Monthly_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_monthlyId_fkey" FOREIGN KEY ("monthlyId") REFERENCES "Monthly"("id") ON DELETE CASCADE ON UPDATE CASCADE;
