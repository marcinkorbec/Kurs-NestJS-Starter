import {MigrationInterface, QueryRunner} from "typeorm";

export class ManyToOneAndOneToMany1702753754531 implements MigrationInterface {
    name = 'ManyToOneAndOneToMany1702753754531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shop_item` ADD `mainProductId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `shop_item` DROP FOREIGN KEY `FK_97a163845911eca4232df8d62c3`");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `createdAt` `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `detailsId` `detailsId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `shop_item` ADD CONSTRAINT `FK_97a163845911eca4232df8d62c3` FOREIGN KEY (`detailsId`) REFERENCES `shop_item_details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `shop_item` ADD CONSTRAINT `FK_474e4d5aa2855ea63c783ae1d44` FOREIGN KEY (`mainProductId`) REFERENCES `shop_item`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shop_item` DROP FOREIGN KEY `FK_474e4d5aa2855ea63c783ae1d44`");
        await queryRunner.query("ALTER TABLE `shop_item` DROP FOREIGN KEY `FK_97a163845911eca4232df8d62c3`");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `detailsId` `detailsId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `createdAt` `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()");
        await queryRunner.query("ALTER TABLE `shop_item` ADD CONSTRAINT `FK_97a163845911eca4232df8d62c3` FOREIGN KEY (`detailsId`) REFERENCES `shop_item_details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `shop_item` DROP COLUMN `mainProductId`");
    }

}
