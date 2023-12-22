import { Body, Controller, Post, UsePipes, ValidationPipe, Delete, Param, ParseIntPipe, Get, HttpStatus, HttpException } from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketItemDto } from '../shared/DTOs/create-basket-item.dto';

@Controller('basket')
export class BasketController {
    constructor(private readonly basketService: BasketService) { }

    @Post('add')
    async addToBasket(@Body() createBasketItemDto: CreateBasketItemDto) {
        try {
            const newItem = await this.basketService.addToBasket(createBasketItemDto);
            return newItem;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete('remove/:id')
    async removeFromBasket(@Param('id') id: number) {
        try {
            await this.basketService.removeFromBasket(id);
            return { message: 'Item removed successfully' };
        } catch (error) {
            throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
        }
    }

    @Delete('clear')
    async clearBasket() {
        await this.basketService.clearBasket();
        return { message: 'Basket cleared successfully' };
    }

    @Get()
    async getBasket() {
        return await this.basketService.getBasket();
    }

    @Get('total-price')
    async getTotalPrice() {
        try {
            const totalPrice = await this.basketService.getTotalPrice();
            return { totalPrice };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
