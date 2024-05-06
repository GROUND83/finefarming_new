-- AlterTable
ALTER TABLE "Farm" ALTER COLUMN "reservationMax" SET DEFAULT 60,
ALTER COLUMN "reservationMin" SET DEFAULT 2,
ALTER COLUMN "slot" SET DEFAULT ARRAY['{ "visible": "false" ,"startTime": "8:00" ,"amount": "3"}']::JSONB[];
