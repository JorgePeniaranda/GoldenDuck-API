/*
  Warnings:

  - You are about to drop the column `calcelled` on the `investment` table. All the data in the column will be lost.
  - You are about to drop the column `calcelled` on the `loan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `investment` DROP COLUMN `calcelled`,
    ADD COLUMN `canceled` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `loan` DROP COLUMN `calcelled`,
    ADD COLUMN `canceled` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `canceled` BOOLEAN NOT NULL DEFAULT false;
