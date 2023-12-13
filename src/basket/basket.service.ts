import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { ShopService } from '../shop/shop.service';
import { CreateBasketItemDto } from '../shared/DTOs/create-basket-item.dto';
import { BasketItem } from 'src/shared';

@Injectable()
export class BasketService {
    private basket: CreateBasketItemDto[] = [];

    constructor(@Inject(forwardRef(() => ShopService)) private shopService: ShopService) { }

    addToBasket(item: CreateBasketItemDto): { isSuccess: boolean; index?: number } {
        if (
            typeof item.name !== 'string' ||
            item.name.trim() === '' ||
            typeof item.count !== 'number' ||
            item.count < 1
        ) {
            console.log('Invalid item:', item);
            return { isSuccess: false };
        }

        const index = this.basket.push({ name: item.name, count: item.count }) - 1;
        console.log('Basket now:', this.basket);
        return { isSuccess: true, index };
    }

    removeFromBasket(index: number): { isSuccess: boolean } {
        if (index >= 0 && index < this.basket.length) {
            this.basket.splice(index, 1);
            console.log('Basket after removal:', this.basket);
            return { isSuccess: true };
        } else {
            console.log('Attempted to remove invalid index:', index);
            return { isSuccess: false };
        }
    }

    getBasket(): CreateBasketItemDto[] {
        return this.basket;
    }

    getTotalPrice(): number {
        let totalPrice = 0;
        for (const item of this.basket) {
            try {
                const netPrice = this.shopService.getNetPrice(item.name);
                totalPrice += netPrice * 1.23;
            } catch (error) {
                if (error instanceof NotFoundException) {
                    throw new Error(`Product ${item.name} is not available`);

                }
            }
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