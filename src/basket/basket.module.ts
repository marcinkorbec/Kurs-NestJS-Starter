import { Module, forwardRef } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { ShopModule } from 'src/shop/shop.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketItem } from './basket-item.entity';

@Module({
    imports: [forwardRef(() => ShopModule), TypeOrmModule.forFeature([BasketItem])],
    controllers: [BasketController],
    providers: [BasketService],
    exports: [BasketService]
})
export class BasketModule { }
