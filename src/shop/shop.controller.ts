import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GetListOfProducts, ShopService } from './shop.service';
import { ShopItem } from './shop-item.entity';

@Controller('shop')
export class ShopController {
    constructor(private shopService: ShopService) { }

    @Get('/')
    async getItems(@Query('page') page: number, @Query('limit') limit: number): Promise<{ items: GetListOfProducts, maxPages: number }> {
        const { items, maxPages } = await this.shopService.getObjects(page, limit);
        return { items, maxPages };
    }

    @Get('/one/:id')
    async getItem(@Param('id') id: string): Promise<ShopItem> {
        return this.shopService.getObject(id);
    }

    @Post('/new-product')
    async createProduct(@Body() product: ShopItem): Promise<ShopItem> {
        return this.shopService.createProduct(product);
    }

    @Get('/test/:page')
    async getItemsWithPriceGreaterThanTwo(@Param('page') page: number, @Query('limit') limit: number): Promise<{ data: ShopItem[], count: number }> {
        return this.shopService.getItemsWithPriceGreaterThanTwo(page, limit);
    }
}