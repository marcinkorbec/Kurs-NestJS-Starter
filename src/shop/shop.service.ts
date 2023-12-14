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


    async getObjects(): Promise<GetListOfProducts> {
        return await this.productRepository.find();
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
        return Math.floor(this.basketService.getTotalPrice() / 10);
    }

}
export { GetListOfProducts };

