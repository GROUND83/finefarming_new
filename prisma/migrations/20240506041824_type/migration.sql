-- AlterTable
ALTER TABLE "Farm" ALTER COLUMN "slot" SET DEFAULT ARRAY['{ "type": false ,"visible": true ,"startTime": "8:00" ,"amount": 3}']::JSONB[];

-- AlterTable
ALTER TABLE "ReserVationDate" ADD COLUMN     "type" BOOLEAN NOT NULL DEFAULT true;
