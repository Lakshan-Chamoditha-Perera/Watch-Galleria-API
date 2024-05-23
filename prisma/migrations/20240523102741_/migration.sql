/*
  Warnings:

  - Added the required column `quantity` to the `Watch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Watch" ADD COLUMN     "discription" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "quantity" INTEGER NOT NULL;
