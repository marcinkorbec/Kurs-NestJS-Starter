import { Module, forwardRef } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { ShopModule } from 'src/shop/shop.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketItem } from './basket-item.entity';
import { AdministratorModule } from 'src/administrator/administrator.module';
import { Basket } from './basket.entity';
import { UsersModule } from 'src/users/users.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
    imports: [
        forwardRef(() => ShopModule),
        forwardRef(() => AdministratorModule),
        forwardRef(() => UsersModule),
        forwardRef(() => MailModule),
        TypeOrmModule.forFeature([BasketItem, Basket])
    ],
    controllers: [BasketController],
    providers: [BasketService],
    exports: [BasketService]
})
export class BasketModule { }
