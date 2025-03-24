/*
  Warnings:

  - You are about to drop the `SacTi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `sacTiId` on the `Tag` table. All the data in the column will be lost.
  - Added the required column `sacTi` to the `BatchRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `BatchRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "SacTi_sacNumber_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SacTi";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BatchRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isWeekly" BOOLEAN NOT NULL DEFAULT false,
    "scheduledDate" DATETIME,
    "sacTi" TEXT NOT NULL,
    "type" TEXT NOT NULL
);
INSERT INTO "new_BatchRequest" ("createdAt", "id", "name") SELECT "createdAt", "id", "name" FROM "BatchRequest";
DROP TABLE "BatchRequest";
ALTER TABLE "new_BatchRequest" RENAME TO "BatchRequest";
CREATE TABLE "new_Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Tag" ("createdAt", "id", "name") SELECT "createdAt", "id", "name" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
