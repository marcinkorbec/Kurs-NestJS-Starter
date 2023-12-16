import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ShopItemDetails } from "./shop-item-details.entity";

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
}

export type GetListOfProducts = ShopItem[];