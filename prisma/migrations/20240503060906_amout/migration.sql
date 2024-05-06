-- AlterTable
ALTER TABLE "Farm" ALTER COLUMN "slot" SET DEFAULT ARRAY['{ "visible": true ,"startTime": "8:00" ,"amount": 3}']::JSONB[];
