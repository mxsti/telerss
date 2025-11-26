/*
  Warnings:

  - Added the required column `latestPubDate` to the `Feed` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feed" ADD COLUMN     "latestPubDate" TIMESTAMP(3) NOT NULL;
