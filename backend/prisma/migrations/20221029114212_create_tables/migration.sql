-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `admin` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cars` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `model` VARCHAR(50) NOT NULL,
    `brand` VARCHAR(50) NOT NULL,
    `price` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `photos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(50) NOT NULL,
    `carId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `photos_carId_key`(`carId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `photos` ADD CONSTRAINT `photos_carId_fkey` FOREIGN KEY (`carId`) REFERENCES `cars`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
