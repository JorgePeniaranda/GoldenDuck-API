/*
  Warnings:

  - Added the required column `expired_at` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Session` ADD COLUMN `expired_at` DATETIME(3) NOT NULL;
