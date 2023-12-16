import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ShopItem } from "./shop-item.entity";

@Entity()
export class ShopItemDetails {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 70 })
    color: string;

    @Column()
    width: number;

    @OneToOne(type => ShopItem)
    ShopItem: ShopItem;

}