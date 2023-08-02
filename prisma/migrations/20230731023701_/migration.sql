/*
  Warnings:

  - Added the required column `endTime` to the `AvailableTimes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `AvailableTimes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AvailableTimes" ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL;
ALTER TABLE "AvailableTimes" ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;
