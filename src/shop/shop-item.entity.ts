import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ShopItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 60 })
    name: string;

    @Column({ type: "float", precision: 6, scale: 2 })
    priceNet: number;

    @Column({ length: 10000, default: '(brak)' })
    description: string;

    @Column()
    boughtCounter: number;

    @Column()
    wasEverBought: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    netPrice: number;
}

export type GetListOfProducts = ShopItem[];