import { Column, PrimaryGeneratedColumn } from "typeorm";

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
}