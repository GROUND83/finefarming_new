-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "reservationMax" INTEGER NOT NULL DEFAULT 60,
ADD COLUMN     "reservationMin" INTEGER NOT NULL DEFAULT 2,
ADD COLUMN     "slot" JSONB[] DEFAULT ARRAY['{ "type": false ,"visible": true ,"startTime": "9:00" ,"amount": 3}']::JSONB[];

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
