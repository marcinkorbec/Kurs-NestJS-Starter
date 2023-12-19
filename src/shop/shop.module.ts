import { Module, forwardRef } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { BasketModule } from 'src/basket/basket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopItem } from './shop-item.entity';
import { ShopItemDetails } from './shop-item-details.entity';

@Module({
    imports: [forwardRef(() => BasketModule), TypeOrmModule.forFeature([ShopItem]), TypeOrmModule.forFeature([ShopItemDetails])],
    controllers: [ShopController],
    providers: [ShopService],
    exports: [ShopService]
})
export class ShopModule { }
