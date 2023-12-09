import { Injectable } from '@nestjs/common';
import { ShopService } from '../shop/shop.service';
import { CreateBasketItemDto } from '../shared/DTOs/create-basket-item.dto';

@Injectable()
export class BasketService {
    private basket: any[] = [];
    constructor(private readonly shopService: ShopService) { }

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

    getBasket(): any[] {
        return this.basket;
    }
}