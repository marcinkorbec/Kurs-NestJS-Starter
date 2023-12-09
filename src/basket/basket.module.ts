import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { ShopService } from '../shop/shop.service';

@Module({
    controllers: [BasketController],
    providers: [BasketService, ShopService],
})
export class BasketModule { }
