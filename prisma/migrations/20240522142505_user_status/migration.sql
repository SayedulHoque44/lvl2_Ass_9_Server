-- CreateEnum
CREATE TYPE "userStatus" AS ENUM ('ACTIVE', 'DEACTIVE');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isActive" "userStatus" NOT NULL DEFAULT 'ACTIVE';
