-- CreateTable
CREATE TABLE "PersonalPolicy" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "content" TEXT,

    CONSTRAINT "PersonalPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServicePolicy" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "content" TEXT,

    CONSTRAINT "ServicePolicy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefundPolicy" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "content" TEXT,

    CONSTRAINT "RefundPolicy_pkey" PRIMARY KEY ("id")
);
