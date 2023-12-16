import {MigrationInterface, QueryRunner} from "typeorm";

export class NewShopItemDetails1702732705859 implements MigrationInterface {
    name = 'NewShopItemDetails1702732705859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `shop_item_details` (`id` varchar(36) NOT NULL, `color` varchar(70) NOT NULL, `width` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `createdAt` `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `createdAt` `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()");
        await queryRunner.query("DROP TABLE `shop_item_details`");
    }

}
