/*
  Warnings:

  - A unique constraint covering the columns `[teamId,leagueId]` on the table `Availability` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Availability_teamId_leagueId_key" ON "Availability"("teamId", "leagueId");
