/*
  Warnings:

  - You are about to drop the column `user_id` on the `activity` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `activity` DROP FOREIGN KEY `Activity_user_id_fkey`;

-- AlterTable
ALTER TABLE `activity` DROP COLUMN `user_id`,
    ADD COLUMN `id_user` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
