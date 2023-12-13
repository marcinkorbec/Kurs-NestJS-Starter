import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimingInterceptor } from './timing.decorator';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ShopController } from './shop/shop.controller';
import { ShopService } from './shop/shop.service';
import { BasketController } from './basket/basket.controller';
import { BasketService } from './basket/basket.service';
import { BasketModule } from './basket/basket.module';

@Module({
    imports: [
        // TypeOrmModule.forRoot(),
        BasketModule],
    controllers: [AppController, ShopController, BasketController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: TimingInterceptor,
        },
        ShopService,
        BasketService
    ],
})
export class AppModule {
}
