/*
  Warnings:

  - Made the column `picture` on table `categories` required. This step will fail if there are existing NULL values in that column.
  - Made the column `picture` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `categories` MODIFY `parent_id` INTEGER NULL,
    MODIFY `picture` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `products` MODIFY `picture` VARCHAR(191) NOT NULL;
