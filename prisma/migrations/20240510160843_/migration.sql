-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "groupMember" JSONB[] DEFAULT ARRAY['{ "isFree": false ,"startAge": "0" ,"endAge": "1","message": ""}']::JSONB[];
