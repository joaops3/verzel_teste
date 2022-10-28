/*
  Warnings:

  - You are about to drop the column `photo` on the `cars` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cars` DROP COLUMN `photo`;

-- CreateTable
CREATE TABLE `photos` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(50) NOT NULL,
    `carId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `photos_carId_key`(`carId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `photos` ADD CONSTRAINT `photos_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `cars`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
