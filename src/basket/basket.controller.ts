import { Body, Controller, Post, UsePipes, ValidationPipe, Delete, Param, ParseIntPipe, Get } from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketItemDto } from '../shared/DTOs/create-basket-item.dto';

@Controller('basket')
export class BasketController {
    constructor(private readonly basketService: BasketService) { }

    @Post('/')
    @UsePipes(new ValidationPipe({ transform: true }))
    addBasketItem(@Body() item: CreateBasketItemDto): any {
        return this.basketService.addToBasket(item);
    }
    @Delete('/:index')
    removeBasketItem(@Param('index', ParseIntPipe) index: number): { isSuccess: boolean } {
        return this.basketService.removeFromBasket(index);
    }

    @Get('/')
    getBasketContents(): any[] {
        return this.basketService.getBasket();
    }
}
