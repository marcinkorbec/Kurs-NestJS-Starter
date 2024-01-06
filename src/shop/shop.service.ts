import { Injectable, NotFoundException } from '@nestjs/common';
import { GetListOfProducts, ShopItem } from './shop-item.entity';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopItemDetails } from './shop-item-details.entity';
import { AddProductDto } from './DTO/add-product.dto';
import { MulterDiskUploadedFiles } from 'src/shared/interfaces/files';
import { storageDir } from 'src/utils/storage';
import * as path from 'path';
import { ShopItemInterface } from 'src/shared';
const fs = require('fs').promises;



@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ShopItem)
    private productRepository: Repository<ShopItem>,
    @InjectRepository(ShopItemDetails)
    private productDetailsRepository: Repository<ShopItemDetails>,
  ) {}

  filter(ShopItem: ShopItem): ShopItemInterface {
    const { id, name, description, priceNet } = ShopItem;
    return { id, name, description, priceNet };
  }

  async getPhoto(id: string, res: any): Promise<any> {
    try {
      const one = await this.productRepository.findOne(id);
      if (!one) {
        throw new NotFoundException('Product not found');
      }
      if (!one.photoFn) {
        throw new NotFoundException('Photo not found');
      }
      res.sendFile(one.photoFn, {
        root: path.join(storageDir(), 'product-photos'),
      });
    } catch (error) {
      throw res.json(error);
    }
  }

  async getObjects(
    page = 1,
    limit = 20,
    filter?: string,
  ): Promise<{ items: GetListOfProducts; maxPages: number }> {
    const [items, totalItems] = await this.productRepository.findAndCount({
      relations: ['details', 'mainProduct'],
      where: filter ? { name: Like(`%${filter}%`) } : {},
      skip: (page - 1) * limit,
      take: limit,
    });

    const maxPages = Math.ceil(totalItems / limit);

    return { items, maxPages };
  }

  async getItemsWithPriceGreaterThanTwo(
    page = 1,
    limit = 5,
  ): Promise<{ data: ShopItem[]; count: number }> {
    const queryBuilder = this.productRepository.createQueryBuilder('product');
    queryBuilder.where('product.priceNet > :price', { price: 2 });
    const skippedItems = (page - 1) * limit;
    queryBuilder.skip(skippedItems);
    queryBuilder.take(limit);
    const [data, count] = await queryBuilder.getManyAndCount();
    return { data, count };
  }

  async createProduct(
    product: AddProductDto,
    files: MulterDiskUploadedFiles,
  ): Promise<ShopItem> {
    let myFile = null;
    try {
      const newProduct = this.productRepository.create(product);
      myFile = files?.photo?.[0] ?? null;
      console.log(myFile);

      if (myFile) {
        newProduct.photoFn = myFile.filename;
      }
      await this.productRepository.save(newProduct);

      const details = new ShopItemDetails();
      details.color = 'niebieski';
      details.width = 20;
      newProduct.details = details;

      await this.productDetailsRepository.save(details);
      await this.productRepository.save(newProduct);

      return newProduct;
    } catch (error) {
      if (myFile && myFile.filename) {
        try {
          const filePath = path.join(
            storageDir(),
            'product-photos',
            myFile.filename,
          );
          await fs.unlink(filePath);
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
    const product = await this.productRepository.find({
      where: { name: productName },
    });
    return product !== undefined;
  }

  async getNetPrice(productName: string): Promise<number> {
    const product = await this.productRepository.findOne({
      where: { name: productName },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product.priceNet;
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


