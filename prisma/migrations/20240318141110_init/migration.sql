/*
  Warnings:

  - You are about to alter the column `number` on the `card` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - You are about to alter the column `cvv` on the `card` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `card` MODIFY `number` BIGINT NOT NULL,
    MODIFY `cvv` INTEGER NOT NULL;
