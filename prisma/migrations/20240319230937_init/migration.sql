/*
  Warnings:

  - You are about to drop the column `createdAt` on the `card` table. All the data in the column will be lost.
  - You are about to drop the column `idAccount` on the `card` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `card` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `error` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `error` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `investment` table. All the data in the column will be lost.
  - You are about to drop the column `idAccount` on the `investment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `investment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `loan` table. All the data in the column will be lost.
  - You are about to drop the column `dateEnd` on the `loan` table. All the data in the column will be lost.
  - You are about to drop the column `idAccount` on the `loan` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `loan` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `notification` table. All the data in the column will be lost.
  - You are about to drop the column `idAccount` on the `notification` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `notification` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `deviceType` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `idUser` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `logoutAt` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `userAgent` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `idCategory` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `id_account` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_account` to the `Investment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_end` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_account` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_account` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `card` DROP FOREIGN KEY `Card_idAccount_fkey`;

-- DropForeignKey
ALTER TABLE `investment` DROP FOREIGN KEY `Investment_idAccount_fkey`;

-- DropForeignKey
ALTER TABLE `loan` DROP FOREIGN KEY `Loan_idAccount_fkey`;

-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `Notification_idAccount_fkey`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_idUser_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_idCategory_fkey`;

-- AlterTable
ALTER TABLE `card` DROP COLUMN `createdAt`,
    DROP COLUMN `idAccount`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `id_account` INTEGER NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `category` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `error` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `investment` DROP COLUMN `createdAt`,
    DROP COLUMN `idAccount`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `id_account` INTEGER NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `loan` DROP COLUMN `createdAt`,
    DROP COLUMN `dateEnd`,
    DROP COLUMN `idAccount`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `date_end` DATETIME(3) NOT NULL,
    ADD COLUMN `id_account` INTEGER NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `message` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `notification` DROP COLUMN `createdAt`,
    DROP COLUMN `idAccount`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `id_account` INTEGER NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `session` DROP COLUMN `createdAt`,
    DROP COLUMN `deviceType`,
    DROP COLUMN `idUser`,
    DROP COLUMN `logoutAt`,
    DROP COLUMN `userAgent`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `device_type` VARCHAR(191) NULL,
    ADD COLUMN `id_user` INTEGER NOT NULL,
    ADD COLUMN `logout_at` DATETIME(3) NULL,
    ADD COLUMN `user_agent` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `createdAt`,
    DROP COLUMN `idCategory`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `id_category` INTEGER NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_id_account_fkey` FOREIGN KEY (`id_account`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_id_account_fkey` FOREIGN KEY (`id_account`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_id_category_fkey` FOREIGN KEY (`id_category`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Loan` ADD CONSTRAINT `Loan_id_account_fkey` FOREIGN KEY (`id_account`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Investment` ADD CONSTRAINT `Investment_id_account_fkey` FOREIGN KEY (`id_account`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
