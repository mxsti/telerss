/*
  Warnings:

  - A unique constraint covering the columns `[url,userId]` on the table `Feed` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Feed_url_userId_key" ON "Feed"("url", "userId");
