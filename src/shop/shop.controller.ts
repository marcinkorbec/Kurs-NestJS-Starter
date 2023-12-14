import { Controller, Get } from '@nestjs/common';
import { GetListOfProducts, ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
    constructor(private shopService: ShopService) { }

    @Get()
    async getItems(): Promise<GetListOfProducts> {
        return this.shopService.getObjects();
    }
}