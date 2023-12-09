import { Injectable } from '@nestjs/common';
import { ShopItem } from '../shared/index';


@Injectable()
export class ShopService {
    private readonly products: ShopItem[] = [
        {
            name: "Object 1",
            description: "Description of Object 1",
            netPrice: 100
        },
        {
            name: "Object 2",
            description: "Description of Object 2",
            netPrice: 200
        },
        {
            name: "Object 3",
            description: "Description of Object 3",
            netPrice: 300
        }
    ];

    getObjects(): ShopItem[] {
        return this.products;
    }

    doesProductExist(productName: string): boolean {
        const product = this.products.find(p => p.name === productName);
        return product !== undefined;
    }
}
export { ShopItem };

