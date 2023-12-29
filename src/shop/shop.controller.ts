import { BadRequestException, Body, Controller, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { GetListOfProducts, ShopService } from './shop.service';
import { ShopItem } from './shop-item.entity';
import { AddProductDto } from './DTO/add-product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { storageDir } from 'src/utils/storage';
import * as path from 'path';

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
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'photo', maxCount: 1 }
        ], {
            dest: path.join(storageDir(), 'product-photos'),
        })
    )
    async createProduct(
        @Body() product: AddProductDto
    ): Promise<ShopItem> {
        if (!files.photo || files.photo.length === 0) {
            throw new BadRequestException('Photo file is required.');
        }
        const file = files.photo[0];
        return this.shopService.createProduct(product);
    }


    @Get('/test/:page')
    async getItemsWithPriceGreaterThanTwo(@Param('page') page: number, @Query('limit') limit: number): Promise<{ data: ShopItem[], count: number }> {
        return this.shopService.getItemsWithPriceGreaterThanTwo(page, limit);
    }
}