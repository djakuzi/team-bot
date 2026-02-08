/*
  Warnings:

  - You are about to drop the column `reapetRangeDays` on the `Reminder` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reminder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "repeat" BOOLEAN NOT NULL,
    "repeatRangeDays" INTEGER,
    "executedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastExecutedAt" DATETIME
);
INSERT INTO "new_Reminder" ("desc", "executedAt", "id", "lastExecutedAt", "name", "repeat") SELECT "desc", "executedAt", "id", "lastExecutedAt", "name", "repeat" FROM "Reminder";
DROP TABLE "Reminder";
ALTER TABLE "new_Reminder" RENAME TO "Reminder";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
