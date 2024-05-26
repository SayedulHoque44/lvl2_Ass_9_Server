/*
  Warnings:

  - You are about to drop the column `found` on the `lostItems` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "lostItems" DROP COLUMN "found",
ADD COLUMN     "founded" BOOLEAN NOT NULL DEFAULT false;
