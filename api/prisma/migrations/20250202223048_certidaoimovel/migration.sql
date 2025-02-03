/*
  Warnings:

  - A unique constraint covering the columns `[certidaoId]` on the table `Imovel` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Certidao` ADD COLUMN `imovelId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Imovel` ADD COLUMN `certidaoId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Imovel_certidaoId_key` ON `Imovel`(`certidaoId`);

-- AddForeignKey
ALTER TABLE `Imovel` ADD CONSTRAINT `Imovel_certidaoId_fkey` FOREIGN KEY (`certidaoId`) REFERENCES `Certidao`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
