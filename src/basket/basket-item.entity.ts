import { ShopItem } from 'src/shop/shop-item.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Basket } from './basket.entity';

@Entity()
export class BasketItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    count: number;

    @ManyToMany(() => ShopItem)
    @JoinTable()
    items: ShopItem[];

    @ManyToOne(() => Basket, basket => basket.items)
    basket: Basket;
}
