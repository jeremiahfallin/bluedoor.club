/*
  Warnings:

  - You are about to drop the column `game` on the `League` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "League" DROP COLUMN "game";
ALTER TABLE "League" ADD COLUMN     "gameId" STRING;

-- CreateTable
CREATE TABLE "Game" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "slug" STRING NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_name_key" ON "Game"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Game_slug_key" ON "Game"("slug");

-- AddForeignKey
ALTER TABLE "League" ADD CONSTRAINT "League_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;
