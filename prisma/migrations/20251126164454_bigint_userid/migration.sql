/*
  Warnings:

  - You are about to alter the column `id` on the `User` table. The data in that column will be cast from `Int` to `BigInt`. This cast may fail. Please make sure the data in the column can be cast.
  - Changed the type of `userId` on the `Feed` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Feed" DROP CONSTRAINT "Feed_userId_fkey";

-- AlterTable
ALTER TABLE "Feed" DROP COLUMN "userId";
ALTER TABLE "Feed" ADD COLUMN     "userId" INT8 NOT NULL;

-- RedefineTables
CREATE TABLE "_prisma_new_User" (
    "id" INT8 NOT NULL,
    "name" STRING NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_User" ("id","name") SELECT "id","name" FROM "User";
DROP TABLE "public"."User" CASCADE;
ALTER TABLE "_prisma_new_User" RENAME TO "User";

-- CreateIndex
CREATE UNIQUE INDEX "Feed_url_userId_key" ON "Feed"("url", "userId");

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
