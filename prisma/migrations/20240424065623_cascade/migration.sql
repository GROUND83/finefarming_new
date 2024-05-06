-- DropForeignKey
ALTER TABLE "ReserVationDate" DROP CONSTRAINT "ReserVationDate_farmId_fkey";

-- AddForeignKey
ALTER TABLE "ReserVationDate" ADD CONSTRAINT "ReserVationDate_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
