import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { ShopService } from '../shop/shop.service';
import { CreateBasketItemDto } from '../shared/DTOs/create-basket-item.dto';
// import { BasketItem } from 'src/shared';
import { InjectRepository } from '@nestjs/typeorm';
import { BasketItem } from './basket-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BasketService {
    private basket: CreateBasketItemDto[] = [];

    constructor(
        @Inject(forwardRef(() => ShopService)) private shopService: ShopService,
        @InjectRepository(BasketItem) private basketItemRepository: Repository<BasketItem>,
    ) { }

    async addToBasket(itemDto: CreateBasketItemDto): Promise<BasketItem> {
        const item = this.basketItemRepository.create(itemDto);
        await this.basketItemRepository.save(item);
        return item;
    }

    async removeFromBasket(id: number): Promise<void> {
        const result = await this.basketItemRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('Item not found in basket');
        }
    }

    async clearBasket(): Promise<void> {
        await this.basketItemRepository.clear();
    }

    async getBasket(): Promise<BasketItem[]> {
        return await this.basketItemRepository.find();
    }

    async getTotalPrice(): Promise<number> {
        let totalPrice = 0;
        const basketItems = await this.getBasket();
        for (const item of basketItems) {
            const netPrice = await this.shopService.getNetPrice(item.name);
            totalPrice += netPrice * 1.23; // assuming VAT is 23%
        }
        return totalPrice;
    }

    getAlternativeBasket(): { alternativeBasket: BasketItem[], removedItems: BasketItem[] } {
        const alternativeBasket = [];
        const removedItems = [];

        for (const item of this.basket) {
            try {
                this.shopService.getNetPrice(item.name);
                alternativeBasket.push(item);
            } catch (error) {
                if (error instanceof NotFoundException) {
                    removedItems.push(item);
                }
            }
        }

        return { alternativeBasket, removedItems };
    }
}