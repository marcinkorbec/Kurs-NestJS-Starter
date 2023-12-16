import {MigrationInterface, QueryRunner} from "typeorm";

export class NewShopItemDetailsRelation1702734597987 implements MigrationInterface {
    name = 'NewShopItemDetailsRelation1702734597987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_97a163845911eca4232df8d62c` ON `shop_item`");
        await queryRunner.query("ALTER TABLE `shop_item` DROP FOREIGN KEY `FK_97a163845911eca4232df8d62c3`");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `createdAt` `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `detailsId` `detailsId` varchar(36) NULL");
        await queryRunner.query("ALTER TABLE `shop_item` ADD CONSTRAINT `FK_97a163845911eca4232df8d62c3` FOREIGN KEY (`detailsId`) REFERENCES `shop_item_details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shop_item` DROP FOREIGN KEY `FK_97a163845911eca4232df8d62c3`");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `detailsId` `detailsId` varchar(36) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `createdAt` `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()");
        await queryRunner.query("ALTER TABLE `shop_item` ADD CONSTRAINT `FK_97a163845911eca4232df8d62c3` FOREIGN KEY (`detailsId`) REFERENCES `shop_item_details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_97a163845911eca4232df8d62c` ON `shop_item` (`detailsId`)");
    }

}
