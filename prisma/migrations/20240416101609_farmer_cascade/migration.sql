-- DropForeignKey
ALTER TABLE "Farm" DROP CONSTRAINT "Farm_ownerId_fkey";

-- AddForeignKey
ALTER TABLE "Farm" ADD CONSTRAINT "Farm_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Farmer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
