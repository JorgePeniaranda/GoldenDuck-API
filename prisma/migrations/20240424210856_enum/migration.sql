/*
  Warnings:

  - You are about to alter the column `sex` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Enum(EnumId(0))`.
  - You are about to alter the column `role` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `sex` ENUM('MALE', 'FEMALE') NOT NULL,
    MODIFY `role` ENUM('ADMIN', 'SUPPORT', 'USER') NOT NULL DEFAULT 'USER';
