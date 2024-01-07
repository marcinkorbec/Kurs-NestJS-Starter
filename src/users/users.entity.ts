import { BasketItem } from 'src/basket/basket-item.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    login: string;

    @Column()
    password: string;

    @Column({nullable: true, default: null})
    currentTokenId: string | undefined;

    @OneToMany(() => BasketItem, basketItem => basketItem.user)
    basketItems: BasketItem[];
}
