/*
  Warnings:

  - You are about to drop the column `leagueId` on the `Club` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Club" DROP CONSTRAINT "Club_leagueId_fkey";

-- AlterTable
ALTER TABLE "Club" DROP COLUMN "leagueId";
