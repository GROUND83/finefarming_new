-- AlterTable
ALTER TABLE "Farmer" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'farmer';

-- AlterTable
ALTER TABLE "Manager" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'manager';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';

-- AlterTable
ALTER TABLE "Writer" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'writer';

-- CreateTable
CREATE TABLE "SuperManager" (
    "id" SERIAL NOT NULL,
    "password" TEXT,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "avatar" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'superAdmin',

    CONSTRAINT "SuperManager_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SuperManager_username_key" ON "SuperManager"("username");

-- CreateIndex
CREATE UNIQUE INDEX "SuperManager_email_key" ON "SuperManager"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SuperManager_phone_key" ON "SuperManager"("phone");
