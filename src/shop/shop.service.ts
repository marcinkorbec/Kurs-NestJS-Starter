import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { BasketService } from 'src/basket/basket.service';
import { GetListOfProducts, ShopItem } from './shop-item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopItemDetails } from './shop-item-details.entity';



@Injectable()
export class ShopService {

    constructor(
        @Inject(forwardRef(() => BasketService)) private basketService: BasketService,
        @InjectRepository(ShopItem)
        private productRepository: Repository<ShopItem>,
        @InjectRepository(ShopItemDetails)
        private productDetailsRepository: Repository<ShopItemDetails>
    ) { }


    async getObjects(page = 1, limit = 20): Promise<{ items: GetListOfProducts, maxPages: number }> {
        const [items, totalItems] = await this.productRepository.findAndCount({
            relations: ['details', 'mainProduct'],
            skip: (page - 1) * limit,
            take: limit
        });

        const maxPages = Math.ceil(totalItems / limit);

        return { items, maxPages };
    }

    // async getItemsWithPriceGreaterThanTwo(page: number = 1, limit: number = 5): Promise<{ data: ShopItem[], count: number }> {
    //     const queryBuilder = this.productRepository.createQueryBuilder('product');

    //     queryBuilder.where('product.priceNet > :price', { price: 1 });

    //     const skippedItems = (page - 1) * limit;
    //     queryBuilder.skip(skippedItems);
    //     queryBuilder.take(limit);

    //     const [data, count] = await queryBuilder.getManyAndCount();

    //     return { data, count };
    // }

    async getItemsWithPriceGreaterThanTwo(): Promise<any[]> {
        const queryBuilder = this.productRepository.createQueryBuilder('product');

        queryBuilder.where('product.priceNet > :price', { price: 2 });

        const items = await queryBuilder.getMany();

        return items;
    }

    async createProduct(product: ShopItem): Promise<ShopItem> {
        const newProduct = await this.productRepository.create(product);
        await this.productRepository.save(newProduct);

        const details = new ShopItemDetails();
        details.color = 'niebieski';
        details.width = 20;
        await this.productDetailsRepository.save(details);


        newProduct.details = details;
        await this.productRepository.save(newProduct);

        return newProduct;
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


