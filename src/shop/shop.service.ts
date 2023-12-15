import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { BasketService } from 'src/basket/basket.service';
import { GetListOfProducts, ShopItem } from './shop-item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';



@Injectable()
export class ShopService {

    constructor(
        @Inject(forwardRef(() => BasketService)) private basketService: BasketService,
        @InjectRepository(ShopItem)
        private productRepository: Repository<ShopItem>
    ) { }


    async getObjects(page = 1, limit = 5): Promise<{ items: GetListOfProducts, maxPages: number }> {
        const [items, totalItems] = await this.productRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit
        });

        const maxPages = Math.ceil(totalItems / limit);

        return { items, maxPages };
    }

    async getObject(id: string): Promise<ShopItem> {
        const product = await this.productRepository.findOne(id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    async doesProductExist(productName: string): Promise<boolean> {
        const product = await this.productRepository.find({ where: { name: productName } });
        return await product !== undefined;
    }

    async getNetPrice(productName: string): Promise<number> {
        const product = await this.productRepository.findOne({ where: { name: productName } });
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return await product.priceNet;
    }

    countPromo(): number {
        const totalPrice = this.basketService.getTotalPrice();
        if (typeof totalPrice !== 'number') {
            throw new Error('Całkowita cena musi być liczbą');
        }
        return Math.floor(totalPrice / 10);
    }

}
export { GetListOfProducts };


