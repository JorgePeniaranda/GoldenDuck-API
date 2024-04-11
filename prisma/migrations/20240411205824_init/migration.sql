/*
  Warnings:

  - You are about to drop the column `from` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `from` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `idReceiver` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idSender` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idReceiver` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idSender` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_from_fkey`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_to_fkey`;

-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `Notification_id_account_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_from_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_to_fkey`;

-- AlterTable
ALTER TABLE `message` DROP COLUMN `from`,
    DROP COLUMN `to`,
    ADD COLUMN `idReceiver` INTEGER NOT NULL,
    ADD COLUMN `idSender` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `from`,
    DROP COLUMN `to`,
    ADD COLUMN `idReceiver` INTEGER NOT NULL,
    ADD COLUMN `idSender` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_idSender_fkey` FOREIGN KEY (`idSender`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_idReceiver_fkey` FOREIGN KEY (`idReceiver`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_id_account_fkey` FOREIGN KEY (`id_account`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_idSender_fkey` FOREIGN KEY (`idSender`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_idReceiver_fkey` FOREIGN KEY (`idReceiver`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
