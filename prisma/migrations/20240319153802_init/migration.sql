-- AlterTable
ALTER TABLE `investment` ADD COLUMN `calcelled` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `loan` ADD COLUMN `calcelled` BOOLEAN NOT NULL DEFAULT false;
