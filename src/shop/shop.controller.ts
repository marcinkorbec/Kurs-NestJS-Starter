import { Controller, Get } from '@nestjs/common';
import { ShopService } from './shop.service';
import { GetListOfProducts } from 'src/shared/interfaces/ShopItem';

@Controller('shop')
export class ShopController {
    constructor(private shopService: ShopService) { }

    @Get()
    getItems(): GetListOfProducts {
        return this.shopService.getObjects();
    }
}