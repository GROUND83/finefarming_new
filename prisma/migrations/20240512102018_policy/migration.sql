-- AlterTable
ALTER TABLE "Farmer" ADD COLUMN     "overForteen" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "personlaPolicy" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "servicePolicy" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Manager" ADD COLUMN     "overForteen" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "personlaPolicy" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "servicePolicy" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "SuperManager" ADD COLUMN     "overForteen" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "personlaPolicy" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "servicePolicy" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "overForteen" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "personlaPolicy" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "servicePolicy" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Writer" ADD COLUMN     "overForteen" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "personlaPolicy" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "servicePolicy" BOOLEAN NOT NULL DEFAULT false;
