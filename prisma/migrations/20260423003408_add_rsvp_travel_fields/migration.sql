-- CreateEnum
CREATE TYPE "TravelChoice" AS ENUM ('YES', 'NO', 'NOT_SURE');

-- AlterTable
ALTER TABLE "RSVP" ADD COLUMN     "needsTransfer" "AttendanceStatus",
ADD COLUMN     "rentingCar" "TravelChoice",
ADD COLUMN     "stayingAtVenue" "AttendanceStatus";
