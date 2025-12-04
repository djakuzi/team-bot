/*
  Warnings:

  - You are about to drop the column `idChat` on the `Settings` table. All the data in the column will be lost.
  - Added the required column `connectedIdChat` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "connectedIdChat" INTEGER NOT NULL
);
INSERT INTO "new_Settings" ("id") SELECT "id" FROM "Settings";
DROP TABLE "Settings";
ALTER TABLE "new_Settings" RENAME TO "Settings";
CREATE UNIQUE INDEX "Settings_connectedIdChat_key" ON "Settings"("connectedIdChat");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
