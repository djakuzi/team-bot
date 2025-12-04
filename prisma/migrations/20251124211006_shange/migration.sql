/*
  Warnings:

  - A unique constraint covering the columns `[toneId]` on the table `ToneSettings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ToneSettings_toneId_key" ON "ToneSettings"("toneId");
