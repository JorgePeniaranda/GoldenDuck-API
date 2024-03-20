/*
  Warnings:

  - You are about to drop the column `createdAt` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `idUser` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `imgUrl` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `activity` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `activity` table. All the data in the column will be lost.
  - You are about to drop the column `dateEnd` on the `investment` table. All the data in the column will be lost.
  - Added the required column `id_user` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_end` to the `Investment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_idUser_fkey`;

-- DropForeignKey
ALTER TABLE `activity` DROP FOREIGN KEY `Activity_userId_fkey`;

-- AlterTable
ALTER TABLE `account` DROP COLUMN `createdAt`,
    DROP COLUMN `idUser`,
    DROP COLUMN `imgUrl`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `id_user` INTEGER NOT NULL,
    ADD COLUMN `img_url` VARCHAR(191) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `activity` DROP COLUMN `createAt`,
    DROP COLUMN `userId`,
    ADD COLUMN `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `user_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `investment` DROP COLUMN `dateEnd`,
    ADD COLUMN `date_end` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
