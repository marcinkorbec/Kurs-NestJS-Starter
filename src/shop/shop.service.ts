import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { GetListOfProducts } from '../shared/index';
import { BasketService } from 'src/basket/basket.service';


@Injectable()
export class ShopService {

    constructor(@Inject(forwardRef(() => BasketService)) private basketService: BasketService) { }


    private readonly products: GetListOfProducts = [
        { name: "Czekolada mleczna", description: "Słodka, kremowa czekolada", netPrice: 2.50 },
        { name: "Cukierki owocowe", description: "Cukierki o smaku owocowym", netPrice: 1.20 },
        { name: "Ciastka zbożowe", description: "Ciastka z pełnego ziarna", netPrice: 3.00 },
        { name: "Lizaki", description: "Kolorowe lizaki o różnych smakach", netPrice: 0.50 },
        { name: "Guma do żucia", description: "Miętowa guma do żucia", netPrice: 1.00 },
        { name: "Krówki", description: "Tradycyjne polskie słodycze", netPrice: 1.50 },
        { name: "Ptasie mleczko", description: "Delikatne pianki w czekoladzie", netPrice: 2.00 },
        { name: "Praliny", description: "Czekoladki z różnymi nadzieniami", netPrice: 3.50 },
        { name: "Draże", description: "Cukierki w kształcie kulek", netPrice: 1.00 },
        { name: "Galaretki", description: "Słodycze o smaku owocowym", netPrice: 1.50 },
        { name: "Czekolada", description: "Klasyczna tabliczka czekolady mlecznej", netPrice: 2.99 },
        { name: "Lizak", description: "Kolorowy lizak o smaku malinowym", netPrice: 0.99 },
        { name: "Karmelki", description: "Małe karmelki owocowe w różnych smakach", netPrice: 1.49 },
        { name: "Ciastko", description: "Delikatne ciastko o kakaowym smaku", netPrice: 1.79 },
        { name: "Lodowiec", description: "Lodowy deser z bitą śmietaną i owocami", netPrice: 3.49 },
        { name: "Chipsy kokosowe", description: "Płatki kokosowe w polewie czekoladowej", netPrice: 1.99 },
        { name: "Cukierek miętowy", description: "Cukierek miętowy z orzeźwiającym smakiem", netPrice: 0.49 },
        { name: "Wafelki z nadzieniem", description: "Cienkie wafelki z kremowym nadzieniem", netPrice: 2.29 },
        { name: "Karmelowy popcorn", description: "Wyborny karmelowy popcorn na słodko", netPrice: 1.89 },
        { name: "Kołaczki", description: "Tradycyjne ciasteczka z nadzieniem owocowym", netPrice: 2.49 },
        { name: "Mleczne krówki", description: "Miękkie i kremowe krówki mleczne", netPrice: 1.29 },
        { name: "Guma do żucia", description: "Guma do żucia o smaku truskawkowym", netPrice: 0.79 },
        { name: "Bombonierka czekoladek", description: "Elegancka bombonierka z różnymi czekoladkami", netPrice: 7.99 },
        { name: "Sorbet truskawkowy", description: "Lodowy sorbet o smaku truskawkowym", netPrice: 2.99 },
        { name: "Cukierki kolorowe", description: "Kolorowe cukierki w przeźroczystej torbie", netPrice: 0.99 },
        { name: "Pączki", description: "Powietrzne pączki z różnymi nadzieniami", netPrice: 1.49 },
        { name: "Sernik", description: "Delikatny sernik z kruszonką", netPrice: 3.99 },
        { name: "Ptasie mleczko", description: "Miękkie pianki z polewą czekoladową", netPrice: 1.79 },
        { name: "Czekoladowy mus", description: "Lekki mus czekoladowy", netPrice: 2.99 },
        { name: "Cukierki mentolowe", description: "Cukierki mentolowe dla świeżego oddechu", netPrice: 0.99 },
        { name: "Wafle", description: "Kruche wafle z warstwą kremu", netPrice: 1.49 },
        { name: "Baton czekoladowy", description: "Energetyczny baton czekoladowy", netPrice: 1.29 },
        { name: "Szarlotka", description: "Pyszna szarlotka z jabłkami i kruszonką", netPrice: 2.99 },
        { name: "Cukierki kwasne", description: "Kwasne cukierki w różnych smakach", netPrice: 0.79 },
        { name: "Pączki z dżemem", description: "Pączki z nadzieniem dżemowym", netPrice: 1.49 },
        { name: "Tarta owocowa", description: "Delikatna tarta z kawałkami owoców", netPrice: 3.49 },
        { name: "Czekoladowe draże", description: "Czekoladki w kolorowych drażetkach", netPrice: 1.99 },
        { name: "Landrynki", description: "Tradycyjne landrynki w różnych smakach", netPrice: 0.49 },
        { name: "Biszkopty", description: "Chrupiące biszkopty do zanurzania w herbacie", netPrice: 2.29 },
        { name: "Kasztanki", description: "Smakowite kasztanki w czekoladzie", netPrice: 1.89 },
        { name: "Tort", description: "Elegancki tort na wyjątkowe okazje", netPrice: 14.99 },
        { name: "Czekoladowy mus", description: "Lekki mus czekoladowy", netPrice: 2.99 },
        { name: "Kuleczki kokosowe", description: "Kuleczki z mielonego kokosa", netPrice: 1.79 },
        { name: "Cukierki owocowe", description: "Cukierki o różnych smakach owocowych", netPrice: 1.99 },
        { name: "Herbatniki", description: "Kruche herbatniki do zanurzania w mleku", netPrice: 0.99 },
        { name: "Makaroniki", description: "Kolorowe makaroniki z nadzieniem kremowym", netPrice: 2.49 },
        { name: "Pudding waniliowy", description: "Klasyczny pudding o smaku waniliowym", netPrice: 1.29 },
        { name: "Krówki karmelowe", description: "Klasyczne karmelki o smaku śmietankowym", netPrice: 0.79 },
        { name: "Krakersy", description: "Chrupiące krakersy o smaku serowym", netPrice: 1.49 },
        { name: "Zefir", description: "Puszysty zefir o smaku malinowym", netPrice: 2.99 },
        { name: "Czekolada gorzka", description: "Intensywna gorzka czekolada", netPrice: 1.99 },
        { name: "Kandyzowana skórka pomarańczowa", description: "Kandyzowana skórka pomarańczowa w czekoladzie", netPrice: 1.49 },
        { name: "Trufle czekoladowe", description: "Wykwintne trufle czekoladowe", netPrice: 3.99 },
        { name: "Lodowe gałki", description: "Lodowe gałki o różnych smakach", netPrice: 2.79 },
        { name: "Ptysie z kremem", description: "Delikatne ptysie z kremem waniliowym", netPrice: 1.79 },
        { name: "Czekoladowe orzechy", description: "Orzechy w polewie czekoladowej", netPrice: 1.99 },
        { name: "Lizaki kwaśne", description: "Kwaśne lizaki o różnych smakach", netPrice: 0.79 },
        { name: "Budyń czekoladowy", description: "Pyszny budyń o smaku czekoladowym", netPrice: 0.99 },
        { name: "Ciastka maślane", description: "Kruche ciastka maślane z marmoladą", netPrice: 1.49 },
        { name: "Kopiec kreta", description: "Klasyczny kopiec kreta z czekolady", netPrice: 2.99 },
        { name: "Karmelki mleczne", description: "Miękkie karmelki o smaku mlecznym", netPrice: 1.29 },
        { name: "Galaretka owocowa", description: "Galaretka owocowa w różnych smakach", netPrice: 0.99 },
        { name: "Ciasto marchewkowe", description: "Puszyste ciasto marchewkowe z kremem", netPrice: 3.49 },
        { name: "Czekolada z orzechami", description: "Czekolada mleczna z dodatkiem orzechów", netPrice: 1.99 },
        { name: "Kruszonki", description: "Kruche kruszonki do posypania ciast", netPrice: 0.49 }
    ];

    getObjects(): GetListOfProducts {
        return this.products;
    }

    doesProductExist(productName: string): boolean {
        const product = this.products.find(p => p.name === productName);
        return product !== undefined;
    }

    getNetPrice(productName: string): number {
        const product = this.products.find(p => p.name === productName);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product.netPrice;
    }

    countPromo(): number {
        return Math.floor(this.basketService.getTotalPrice() / 10);
    }
}
export { GetListOfProducts };

