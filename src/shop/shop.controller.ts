import { Controller, Get } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopItem } from './shop.service';

@Controller('shop')
export class ShopController {
    constructor(private shopService: ShopService) { }

    @Get()
    getItems(): ShopItem[] {
        return this.shopService.getObjects();
    }
}