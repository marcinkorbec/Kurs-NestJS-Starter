import { Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { BasketItem } from './basket-item.entity';
import { User } from 'src/users/users.entity';

@Entity()
export class Basket {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @OneToMany(() => BasketItem, basketItem => basketItem.basket)
    items: BasketItem[];
}