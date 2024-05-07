-- AlterTable
ALTER TABLE "Farmer" ADD COLUMN     "provider" "ProviderType" NOT NULL DEFAULT 'email';

-- AlterTable
ALTER TABLE "Manager" ADD COLUMN     "provider" "ProviderType" NOT NULL DEFAULT 'email';

-- AlterTable
ALTER TABLE "SuperManager" ADD COLUMN     "provider" "ProviderType" NOT NULL DEFAULT 'email';
