import { ShopItem } from 'src/shop/shop-item.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Basket } from './basket.entity';
import { User } from 'src/users/users.entity';

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

    @ManyToOne(() => User, user => user.basketItems)
    user: User;
}
