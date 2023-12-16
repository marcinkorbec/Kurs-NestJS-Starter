import {MigrationInterface, QueryRunner} from "typeorm";

export class NewVersionShopEntity1702762602490 implements MigrationInterface {
    name = 'NewVersionShopEntity1702762602490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `FK_474e4d5aa2855ea63c783ae1d44` ON `shop_item`");
        await queryRunner.query("DROP INDEX `FK_730788347b15ea94eff90045e40` ON `shop_item`");
        await queryRunner.query("CREATE TABLE `shop_set` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `shop_item_details` (`id` varchar(36) NOT NULL, `color` varchar(70) NOT NULL, `width` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `shop_item_sets_shop_set` (`shopItemId` varchar(36) NOT NULL, `shopSetId` varchar(36) NOT NULL, INDEX `IDX_70d26d3beb922ebfdeb4eacb2c` (`shopItemId`), INDEX `IDX_aede7c62f048d5a10071c433d1` (`shopSetId`), PRIMARY KEY (`shopItemId`, `shopSetId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `shop_item` DROP COLUMN `setsId`");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `createdAt` `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `detailsId` `detailsId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `mainProductId` `mainProductId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `shop_item` ADD CONSTRAINT `FK_97a163845911eca4232df8d62c3` FOREIGN KEY (`detailsId`) REFERENCES `shop_item_details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `shop_item` ADD CONSTRAINT `FK_474e4d5aa2855ea63c783ae1d44` FOREIGN KEY (`mainProductId`) REFERENCES `shop_item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `shop_item_sets_shop_set` ADD CONSTRAINT `FK_70d26d3beb922ebfdeb4eacb2c6` FOREIGN KEY (`shopItemId`) REFERENCES `shop_item`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `shop_item_sets_shop_set` ADD CONSTRAINT `FK_aede7c62f048d5a10071c433d14` FOREIGN KEY (`shopSetId`) REFERENCES `shop_set`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shop_item_sets_shop_set` DROP FOREIGN KEY `FK_aede7c62f048d5a10071c433d14`");
        await queryRunner.query("ALTER TABLE `shop_item_sets_shop_set` DROP FOREIGN KEY `FK_70d26d3beb922ebfdeb4eacb2c6`");
        await queryRunner.query("ALTER TABLE `shop_item` DROP FOREIGN KEY `FK_474e4d5aa2855ea63c783ae1d44`");
        await queryRunner.query("ALTER TABLE `shop_item` DROP FOREIGN KEY `FK_97a163845911eca4232df8d62c3`");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `mainProductId` `mainProductId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `detailsId` `detailsId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `createdAt` `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()");
        await queryRunner.query("ALTER TABLE `shop_item` ADD `setsId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("DROP INDEX `IDX_aede7c62f048d5a10071c433d1` ON `shop_item_sets_shop_set`");
        await queryRunner.query("DROP INDEX `IDX_70d26d3beb922ebfdeb4eacb2c` ON `shop_item_sets_shop_set`");
        await queryRunner.query("DROP TABLE `shop_item_sets_shop_set`");
        await queryRunner.query("DROP TABLE `shop_item_details`");
        await queryRunner.query("DROP TABLE `shop_set`");
        await queryRunner.query("CREATE INDEX `FK_730788347b15ea94eff90045e40` ON `shop_item` (`setsId`)");
        await queryRunner.query("CREATE INDEX `FK_474e4d5aa2855ea63c783ae1d44` ON `shop_item` (`mainProductId`)");
    }

}
