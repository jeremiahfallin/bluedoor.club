/*
  Warnings:

  - Added the required column `game` to the `League` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "League" ADD COLUMN     "game" STRING NOT NULL;
