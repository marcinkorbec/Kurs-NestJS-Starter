import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { BasketService } from 'src/basket/basket.service';
import { GetListOfProducts, ShopItem } from './shop-item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopItemDetails } from './shop-item-details.entity';
import { AddProductDto } from './DTO/add-product.dto';
import { MulterDiskUploadedFiles } from 'src/shared/interfaces/files';
import { storageDir } from 'src/utils/storage';
import * as path from 'path';
const fs = require('fs').promises;



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

    async getItemsWithPriceGreaterThanTwo(page: number = 1, limit: number = 5): Promise<{ data: ShopItem[], count: number }> {
        const queryBuilder = this.productRepository.createQueryBuilder('product');

        queryBuilder.where('product.priceNet > :price', { price: 2 });

        const skippedItems = (page - 1) * limit;
        queryBuilder.skip(skippedItems);
        queryBuilder.take(limit);

        const [data, count] = await queryBuilder.getManyAndCount();

        return { data, count };
    }

    // async createProduct(product: AddProductDto, files: MulterDiskUploadedFiles): Promise<ShopItem> {
    //     let myFile = null;
    //     try {
    //         const newProduct = await this.productRepository.create(product);
    //         myFile = files?.photo?.[0] ?? null;
    //         console.log(myFile);

    //         if (myFile) {
    //             newProduct.photoFn = myFile.filename;
    //         }
    //         await this.productRepository.save(newProduct);

    //         throw new Error('Błąd podczas zapisywania produktu');
    //         const details = new ShopItemDetails();
    //         details.color = 'niebieski';
    //         details.width = 20;
    //         newProduct.details = details;

    //         await this.productDetailsRepository.save(details);
    //         await this.productRepository.save(newProduct);

    //         return newProduct;
    //     }
    //     catch (error) {
    //         if (myFile && myFile.filename) {
    //             try {
    //                 const filePath = path.join(storageDir(), 'product-photos', myFile.filename);
    //                 await fs.unlinkSync(filePath);
    //                 console.log('Plik został usunięty z powodu błędu:', error);
    //             } catch (unlinkError) {
    //                 console.error('Błąd podczas usuwania pliku', unlinkError);
    //             }
    //         }

    //         throw error;
    //     }
    // }

    async createProduct(product: AddProductDto, files: MulterDiskUploadedFiles): Promise<ShopItem> {
        let myFile = null;
        try {
            const newProduct = await this.productRepository.create(product);
            myFile = files?.photo?.[0] ?? null;
            console.log(myFile);

            if (myFile) {
                newProduct.photoFn = myFile.filename;
            }
            await this.productRepository.save(newProduct);

            //throw new Error('Błąd podczas zapisywania produktu'); // Usuń to, jeśli to tylko do testów
            // ... reszta twojego kodu ...
            const details = new ShopItemDetails();
            details.color = 'niebieski';
            details.width = 20;
            newProduct.details = details;

            await this.productDetailsRepository.save(details);
            await this.productRepository.save(newProduct);

            return newProduct;
        }
        catch (error) {
            if (myFile && myFile.filename) {
                try {
                    const filePath = path.join(storageDir(), 'product-photos', myFile.filename);
                    await fs.unlink(filePath); // Użyj asynchronicznej funkcji unlink
                    console.log('Plik został usunięty z powodu błędu:', error);
                } catch (unlinkError) {
                    console.error('Błąd podczas usuwania pliku', unlinkError);
                }
            }

            throw error;
        }
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

    // countPromo(): number {
    //     const totalPrice = this.basketService.getTotalPrice();
    //     if (typeof totalPrice !== 'number') {
    //         throw new Error('Całkowita cena musi być liczbą');
    //     }
    //     return Math.floor(totalPrice / 10);
    // }

}
export { GetListOfProducts };


