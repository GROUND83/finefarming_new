-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "personalPrice" SET DEFAULT ARRAY['{ "isFree": true ,"startAge": "0" ,"startTime": "1", "price": "0","message": ""}']::JSONB[];
