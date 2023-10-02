/*
  Warnings:

  - Added the required column `win` to the `Stat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stat" ADD COLUMN     "win" BOOL NOT NULL;
