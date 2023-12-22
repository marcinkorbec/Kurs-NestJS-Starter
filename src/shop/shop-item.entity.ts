import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ShopItemDetails } from "./shop-item-details.entity";
import { ShopSet } from "./shop-set.entity";
import { BasketItem } from "src/basket/basket-item.entity";

@Entity()
export class ShopItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 70 })
    name: string;

    @Column({ type: "float", precision: 6, scale: 2 })
    priceNet: number;

    @Column({ length: 10000, default: '(brak opisu)' })
    description: string;

    @Column()
    boughtCounter: number;

    @Column()
    wasEverBought: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    netPrice: number;

    @OneToOne(type => ShopItemDetails)
    @JoinColumn()
    details: ShopItemDetails;

    // subprodukt;
    @ManyToOne(type => ShopItem, entity => entity.subProducts)
    mainProduct: ShopItem;

    // produkt główny
    @OneToMany(type => ShopItem, entity => entity.mainProduct)
    subProducts: ShopItem[];

    @ManyToMany(type => ShopSet, shopSet => shopSet.items)
    @JoinTable()
    sets: ShopSet[];

    @ManyToMany(() => BasketItem)
    baskets: BasketItem[];
}

export type GetListOfProducts = ShopItem[];