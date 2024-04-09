/*
  Warnings:

  - You are about to drop the column `updated_at` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `card` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `error` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `investment` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `loan` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `notification` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `user` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Error` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Investment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `account` DROP COLUMN `updated_at`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `card` DROP COLUMN `updated_at`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `updated_at`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `error` DROP COLUMN `updated_at`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `investment` DROP COLUMN `updated_at`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `loan` DROP COLUMN `updated_at`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `message` DROP COLUMN `updated_at`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `notification` DROP COLUMN `updated_at`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `updated_at`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `updated_at`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
