-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "connectedIdChat" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Settings_connectedIdChat_key" ON "Settings"("connectedIdChat");
