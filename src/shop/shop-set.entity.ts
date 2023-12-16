import { BaseEntity, Column, Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ShopItem } from "./shop-item.entity";

@Entity()
export class ShopSet extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToMany(type => ShopItem, entity => entity.sets)
    items: ShopItem[];
}