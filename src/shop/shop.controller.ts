import { Controller, Get, Param } from '@nestjs/common';
import { GetListOfProducts, ShopService } from './shop.service';
import { ShopItem } from './shop-item.entity';

@Controller('shop')
export class ShopController {
    constructor(private shopService: ShopService) { }

    @Get()
    async getItems(): Promise<GetListOfProducts> {
        return this.shopService.getObjects();
    }

    @Get('/:id')
    async getItem(@Param('id') id: string): Promise<ShopItem> {
        return this.shopService.getObject(id);
    }
}