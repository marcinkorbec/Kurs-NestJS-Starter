import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBasketDatabase1703246247068 implements MigrationInterface {
    name = 'AddBasketDatabase1703246247068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `basket_item` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `count` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `basket_item_items_shop_item` (`basketItemId` varchar(36) NOT NULL, `shopItemId` varchar(36) NOT NULL, INDEX `IDX_c793503347d673e7c2626cc1ed` (`basketItemId`), INDEX `IDX_e30bea25be5d2f17f024896cac` (`shopItemId`), PRIMARY KEY (`basketItemId`, `shopItemId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `shop_item` DROP FOREIGN KEY `FK_97a163845911eca4232df8d62c3`");
        await queryRunner.query("ALTER TABLE `shop_item` DROP FOREIGN KEY `FK_474e4d5aa2855ea63c783ae1d44`");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `createdAt` `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `detailsId` `detailsId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `mainProductId` `mainProductId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `shop_item` ADD CONSTRAINT `FK_97a163845911eca4232df8d62c3` FOREIGN KEY (`detailsId`) REFERENCES `shop_item_details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `shop_item` ADD CONSTRAINT `FK_474e4d5aa2855ea63c783ae1d44` FOREIGN KEY (`mainProductId`) REFERENCES `shop_item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `basket_item_items_shop_item` ADD CONSTRAINT `FK_c793503347d673e7c2626cc1ed7` FOREIGN KEY (`basketItemId`) REFERENCES `basket_item`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `basket_item_items_shop_item` ADD CONSTRAINT `FK_e30bea25be5d2f17f024896cac6` FOREIGN KEY (`shopItemId`) REFERENCES `shop_item`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `basket_item_items_shop_item` DROP FOREIGN KEY `FK_e30bea25be5d2f17f024896cac6`");
        await queryRunner.query("ALTER TABLE `basket_item_items_shop_item` DROP FOREIGN KEY `FK_c793503347d673e7c2626cc1ed7`");
        await queryRunner.query("ALTER TABLE `shop_item` DROP FOREIGN KEY `FK_474e4d5aa2855ea63c783ae1d44`");
        await queryRunner.query("ALTER TABLE `shop_item` DROP FOREIGN KEY `FK_97a163845911eca4232df8d62c3`");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `mainProductId` `mainProductId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `detailsId` `detailsId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `createdAt` `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()");
        await queryRunner.query("ALTER TABLE `shop_item` ADD CONSTRAINT `FK_474e4d5aa2855ea63c783ae1d44` FOREIGN KEY (`mainProductId`) REFERENCES `shop_item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `shop_item` ADD CONSTRAINT `FK_97a163845911eca4232df8d62c3` FOREIGN KEY (`detailsId`) REFERENCES `shop_item_details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("DROP INDEX `IDX_e30bea25be5d2f17f024896cac` ON `basket_item_items_shop_item`");
        await queryRunner.query("DROP INDEX `IDX_c793503347d673e7c2626cc1ed` ON `basket_item_items_shop_item`");
        await queryRunner.query("DROP TABLE `basket_item_items_shop_item`");
        await queryRunner.query("DROP TABLE `basket_item`");
    }

}
