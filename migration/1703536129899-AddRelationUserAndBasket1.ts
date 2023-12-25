import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRelationUserAndBasket11703536129899 implements MigrationInterface {
    name = 'AddRelationUserAndBasket11703536129899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `basket_item` ADD `userId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `shop_item` DROP FOREIGN KEY `FK_97a163845911eca4232df8d62c3`");
        await queryRunner.query("ALTER TABLE `shop_item` DROP FOREIGN KEY `FK_474e4d5aa2855ea63c783ae1d44`");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `createdAt` `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `detailsId` `detailsId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `mainProductId` `mainProductId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `basket` DROP FOREIGN KEY `FK_26dcb999420495bb5b14a4f8d1c`");
        await queryRunner.query("ALTER TABLE `basket` CHANGE `userId` `userId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `basket_item` DROP FOREIGN KEY `FK_905bbacd09ec186a9232699af68`");
        await queryRunner.query("ALTER TABLE `basket_item` CHANGE `basketId` `basketId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `shop_item` ADD CONSTRAINT `FK_97a163845911eca4232df8d62c3` FOREIGN KEY (`detailsId`) REFERENCES `shop_item_details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `shop_item` ADD CONSTRAINT `FK_474e4d5aa2855ea63c783ae1d44` FOREIGN KEY (`mainProductId`) REFERENCES `shop_item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `basket` ADD CONSTRAINT `FK_26dcb999420495bb5b14a4f8d1c` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `basket_item` ADD CONSTRAINT `FK_905bbacd09ec186a9232699af68` FOREIGN KEY (`basketId`) REFERENCES `basket`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `basket_item` ADD CONSTRAINT `FK_408c366cc3e5c714072e9b3dfc1` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `basket_item` DROP FOREIGN KEY `FK_408c366cc3e5c714072e9b3dfc1`");
        await queryRunner.query("ALTER TABLE `basket_item` DROP FOREIGN KEY `FK_905bbacd09ec186a9232699af68`");
        await queryRunner.query("ALTER TABLE `basket` DROP FOREIGN KEY `FK_26dcb999420495bb5b14a4f8d1c`");
        await queryRunner.query("ALTER TABLE `shop_item` DROP FOREIGN KEY `FK_474e4d5aa2855ea63c783ae1d44`");
        await queryRunner.query("ALTER TABLE `shop_item` DROP FOREIGN KEY `FK_97a163845911eca4232df8d62c3`");
        await queryRunner.query("ALTER TABLE `basket_item` CHANGE `basketId` `basketId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `basket_item` ADD CONSTRAINT `FK_905bbacd09ec186a9232699af68` FOREIGN KEY (`basketId`) REFERENCES `basket`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `basket` CHANGE `userId` `userId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `basket` ADD CONSTRAINT `FK_26dcb999420495bb5b14a4f8d1c` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `mainProductId` `mainProductId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `detailsId` `detailsId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `createdAt` `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()");
        await queryRunner.query("ALTER TABLE `shop_item` ADD CONSTRAINT `FK_474e4d5aa2855ea63c783ae1d44` FOREIGN KEY (`mainProductId`) REFERENCES `shop_item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `shop_item` ADD CONSTRAINT `FK_97a163845911eca4232df8d62c3` FOREIGN KEY (`detailsId`) REFERENCES `shop_item_details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `basket_item` DROP COLUMN `userId`");
    }

}
