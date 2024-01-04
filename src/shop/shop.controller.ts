import { Body, Controller, Get, Param, Post, Query, UseInterceptors, UploadedFiles, Res } from '@nestjs/common';
import { GetListOfProducts, ShopService } from './shop.service';
import { ShopItem } from './shop-item.entity';
import { AddProductDto } from './DTO/add-product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { storageDir, multerStorage } from 'src/utils/storage';
import * as path from 'path';
import { MulterDiskUploadedFiles } from 'src/shared/interfaces/files';

@Controller('shop')
export class ShopController {
    constructor(private shopService: ShopService) { }

    @Get('/one/:id')
    async getItem(@Param('id') id: string): Promise<ShopItem> {
        return this.shopService.getObject(id);
    }

    @Post('/new-product')
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'photo', maxCount: 1 }
        ], {
            storage: multerStorage(path.join(storageDir(), 'product-photos'))
        })
    )
    async createProduct(
        @Body() product: AddProductDto, @UploadedFiles() files: MulterDiskUploadedFiles
    ): Promise<ShopItem> {
        return this.shopService.createProduct(product, files);
    }

    @Get('/test/:page')
    async getItemsWithPriceGreaterThanTwo(@Param('page') page: number, @Query('limit') limit: number): Promise<{ data: ShopItem[], count: number }> {
        return this.shopService.getItemsWithPriceGreaterThanTwo(page, limit);
    }

    @Get('/')
    async getItems(
        @Query('page') page: number,
        @Query('limit') limit: number
    ): Promise<{ items: GetListOfProducts, maxPages: number }> {
        const { items, maxPages } = await this.shopService.getObjects(page, limit);
        return { items, maxPages };
    }

    @Get('/photo/:id')
    async getPhoto(
        @Param('id') id: string,
        @Res() res: any
    ): Promise<any> {
        return this.shopService.getPhoto(id, res);
    }

}