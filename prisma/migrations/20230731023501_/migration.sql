/*
  Warnings:

  - You are about to drop the column `duration` on the `AvailableTimes` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `AvailableTimes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AvailableTimes" DROP COLUMN "duration";
ALTER TABLE "AvailableTimes" DROP COLUMN "startTime";
