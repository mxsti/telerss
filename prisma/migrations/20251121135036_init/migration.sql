-- CreateTable
CREATE TABLE "User" (
    "id" INT4 NOT NULL,
    "name" STRING NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feed" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "description" STRING,
    "url" STRING NOT NULL,
    "userId" INT4,

    CONSTRAINT "Feed_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Feed" ADD CONSTRAINT "Feed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
