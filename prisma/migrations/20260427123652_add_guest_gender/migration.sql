-- CreateEnum
CREATE TYPE "GuestGender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "Guest" ADD COLUMN     "gender" "GuestGender";
