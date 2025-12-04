-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idChat" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Settings_idChat_key" ON "Settings"("idChat");
