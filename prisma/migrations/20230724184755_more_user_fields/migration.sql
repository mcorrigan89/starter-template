-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "familyName" TEXT,
ADD COLUMN     "givenName" TEXT;
