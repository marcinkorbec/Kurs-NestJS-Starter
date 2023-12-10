import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimingInterceptor } from './timing.decorator';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestowyModule } from './testowy/testowy.module';
import { FoxController } from './fox/fox.controller';
import { RequestController } from './request/request.controller';
import { FoxService } from './fox/fox.service';
import { ShopController } from './shop/shop.controller';
import { ShopService } from './shop/shop.service';
import { BasketController } from './basket/basket.controller';
import { BasketService } from './basket/basket.service';
import { BasketModule } from './basket/basket.module';

@Module({
    imports: [
        // TypeOrmModule.forRoot(),
        TestowyModule,
        BasketModule],
    controllers: [AppController, FoxController, RequestController, ShopController, BasketController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: TimingInterceptor,
        },
        FoxService,
        ShopService,
        BasketService
    ],
})
export class AppModule {
}
