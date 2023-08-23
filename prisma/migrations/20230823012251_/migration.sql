/*
  Warnings:

  - Made the column `gameId` on table `League` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "League" DROP CONSTRAINT "League_gameId_fkey";

-- AlterTable
ALTER TABLE "League" ALTER COLUMN "gameId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "League" ADD CONSTRAINT "League_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
