-- CreateTable
CREATE TABLE "Writer" (
    "id" SERIAL NOT NULL,
    "password" TEXT,
    "username" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "avatar" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "kakaoId" TEXT,
    "naverId" TEXT,
    "provider" "ProviderType" NOT NULL,

    CONSTRAINT "Writer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Journal" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER NOT NULL,
    "farmId" INTEGER NOT NULL,
    "titile" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "richText" TEXT,

    CONSTRAINT "Journal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Writer_email_key" ON "Writer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Writer_phone_key" ON "Writer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Writer_kakaoId_key" ON "Writer"("kakaoId");

-- CreateIndex
CREATE UNIQUE INDEX "Writer_naverId_key" ON "Writer"("naverId");

-- AddForeignKey
ALTER TABLE "Journal" ADD CONSTRAINT "Journal_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Writer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Journal" ADD CONSTRAINT "Journal_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
