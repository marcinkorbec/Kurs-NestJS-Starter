import { MigrationInterface, QueryRunner } from "typeorm";

export class NewVersionShopEntity1702659937430 implements MigrationInterface {
    name = 'NewVersionShopEntity1702659937430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `name` `name` varchar(70) NOT NULL");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `description` `description` varchar(10000) NOT NULL DEFAULT '(brak opisu)'");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `createdAt` `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `createdAt` `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `description` `description` varchar(10000) NOT NULL DEFAULT ''(brak)''");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `name` `name` varchar(60) NOT NULL");
    }

}
