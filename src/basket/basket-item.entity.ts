// import { ShopItem } from 'src/shared';
import { ShopItem } from 'src/shop/shop-item.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class BasketItem {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column()
    count: number;

    @ManyToMany(() => ShopItem)
    @JoinTable()
    items: ShopItem[];
}
