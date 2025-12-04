-- CreateTable
CREATE TABLE "Tone" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ToneSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "toneId" INTEGER NOT NULL,
    "updateTime" TEXT,
    CONSTRAINT "ToneSettings_toneId_fkey" FOREIGN KEY ("toneId") REFERENCES "Tone" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Tone_name_key" ON "Tone"("name");
