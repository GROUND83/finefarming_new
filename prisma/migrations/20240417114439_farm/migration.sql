-- AlterTable
ALTER TABLE "Farm" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "reservationMax" DROP NOT NULL,
ALTER COLUMN "reservationMin" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "farmName" TEXT,
ADD COLUMN     "userEmail" TEXT,
ADD COLUMN     "userPhone" TEXT;
