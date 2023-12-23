import { Body, Controller, Post, Delete, Param, Get, HttpStatus, HttpException, Req } from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketItemDto } from '../shared/DTOs/create-basket-item.dto';
import { Request } from 'express';


@Controller('basket')
export class BasketController {
    constructor(private readonly basketService: BasketService) { }

    @Post('/add')
    async addToBasket(@Req() req: Request, @Body() createBasketItemDto: CreateBasketItemDto) {
        const userId = req.user?.id;
        try {
            const newItem = await this.basketService.addToBasket(userId, createBasketItemDto);
            return newItem;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete('remove/:id')
    async removeFromBasket(@Req() req: Request, @Param('id') id: string) {
        const userId = req.user.id;
        try {
            await this.basketService.removeFromBasket(userId, id);
            return { message: 'Item removed successfully' };
        } catch (error) {
            throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
        }
    }

    @Delete('clear')
    async clearBasket(@Req() req: Request) {
        const userId = req.user.id;
        await this.basketService.clearBasket(userId);
        return { message: 'Basket cleared successfully' };
    }

    @Get('total-price')
    async getTotalPrice(@Req() req: Request) {
        const userId = req.user.id;
        try {
            const totalPrice = await this.basketService.getTotalPrice(userId);
            return { totalPrice };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async getBasket(@Req() req: Request) {
        const userId = req.user.id;
        return await this.basketService.getBasket(userId);
    }
}
