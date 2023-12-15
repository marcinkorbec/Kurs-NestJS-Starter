import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetListOfProducts, ShopService } from './shop.service';
import { ShopItem } from './shop-item.entity';

@Controller('shop')
export class ShopController {
    constructor(private shopService: ShopService) { }

    @Get()
    async getItems(@Query('page') page: number, @Query('limit') limit: number): Promise<{ items: GetListOfProducts, maxPages: number }> {
        const { items, maxPages } = await this.shopService.getObjects(page, limit);
        return { items, maxPages };
    }

    @Get('/:id')
    async getItem(@Param('id') id: string): Promise<ShopItem> {
        return this.shopService.getObject(id);
    }
}