export interface ShopItemInterface {
    id: string
    name: string;
    description: string;
    priceNet: number;
}

export type GetListOfProducts = ShopItemInterface[];