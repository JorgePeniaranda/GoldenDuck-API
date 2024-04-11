/*
  Warnings:

  - You are about to drop the column `img_url` on the `account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `account` DROP COLUMN `img_url`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `img_url` VARCHAR(191) NULL;
