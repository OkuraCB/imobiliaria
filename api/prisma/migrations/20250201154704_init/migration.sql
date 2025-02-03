-- CreateTable
CREATE TABLE `Proprietario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf` VARCHAR(16) NOT NULL,
    `nome` TEXT NOT NULL,
    `estadoCivil` TEXT NOT NULL,

    UNIQUE INDEX `cpf_UNIQUE`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Telefone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero` TEXT NOT NULL,
    `proprietarioId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Certidao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero` VARCHAR(100) NOT NULL,
    `dataReg` DATETIME(3) NOT NULL,
    `proprietarioId` INTEGER NOT NULL,

    UNIQUE INDEX `numero_UNIQUE`(`numero`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inquilino` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf` VARCHAR(16) NOT NULL,
    `nome` TEXT NOT NULL,
    `profissao` TEXT NOT NULL,
    `renda` DOUBLE NOT NULL,

    UNIQUE INDEX `cpf_UNIQUE`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fiador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf` VARCHAR(16) NOT NULL,
    `nome` TEXT NOT NULL,
    `renda` DOUBLE NOT NULL,

    UNIQUE INDEX `cpf_UNIQUE`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Corretor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf` VARCHAR(16) NOT NULL,
    `nome` TEXT NOT NULL,
    `creci` TEXT NOT NULL,
    `inicio` DATETIME(3) NOT NULL,
    `comissao` DOUBLE NOT NULL,

    UNIQUE INDEX `cpf_UNIQUE`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Imovel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `endereco` TEXT NOT NULL,
    `numComodos` INTEGER NOT NULL,
    `vagas` INTEGER NOT NULL,
    `area` INTEGER NOT NULL,
    `dataCad` DATETIME(3) NOT NULL,
    `aluguel` DOUBLE NOT NULL,
    `proprietarioId` INTEGER NOT NULL,
    `corretorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Visita` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dataVisita` DATETIME(3) NOT NULL,
    `inquilinoId` INTEGER NOT NULL,
    `imovelId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proposta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dataProposta` DATETIME(3) NOT NULL,
    `valor` DOUBLE NOT NULL,
    `inquilinoId` INTEGER NOT NULL,
    `imovelId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contrato` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ativo` BOOLEAN NOT NULL,
    `inquilinoId` INTEGER NOT NULL,
    `imovelId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Telefone` ADD CONSTRAINT `Telefone_proprietarioId_fkey` FOREIGN KEY (`proprietarioId`) REFERENCES `Proprietario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Certidao` ADD CONSTRAINT `Certidao_proprietarioId_fkey` FOREIGN KEY (`proprietarioId`) REFERENCES `Proprietario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Imovel` ADD CONSTRAINT `Imovel_proprietarioId_fkey` FOREIGN KEY (`proprietarioId`) REFERENCES `Proprietario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Imovel` ADD CONSTRAINT `Imovel_corretorId_fkey` FOREIGN KEY (`corretorId`) REFERENCES `Corretor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Visita` ADD CONSTRAINT `Visita_inquilinoId_fkey` FOREIGN KEY (`inquilinoId`) REFERENCES `Inquilino`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Visita` ADD CONSTRAINT `Visita_imovelId_fkey` FOREIGN KEY (`imovelId`) REFERENCES `Imovel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Proposta` ADD CONSTRAINT `Proposta_inquilinoId_fkey` FOREIGN KEY (`inquilinoId`) REFERENCES `Inquilino`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Proposta` ADD CONSTRAINT `Proposta_imovelId_fkey` FOREIGN KEY (`imovelId`) REFERENCES `Imovel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contrato` ADD CONSTRAINT `Contrato_inquilinoId_fkey` FOREIGN KEY (`inquilinoId`) REFERENCES `Inquilino`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contrato` ADD CONSTRAINT `Contrato_imovelId_fkey` FOREIGN KEY (`imovelId`) REFERENCES `Imovel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
