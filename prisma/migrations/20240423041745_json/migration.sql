-- AlterTable
ALTER TABLE "Farm" ADD COLUMN     "slot" JSONB[] DEFAULT ARRAY['{ "visible": "false" ,"startTime": "08:00" ,"amount": "3"}']::JSONB[];
