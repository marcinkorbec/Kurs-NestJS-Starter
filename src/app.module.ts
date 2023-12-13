import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimingInterceptor } from './timing.decorator';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BasketModule } from './basket/basket.module';
import { ShopModule } from './shop/shop.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        BasketModule,
        ShopModule,
        UsersModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: TimingInterceptor,
        },
    ],
})
export class AppModule {
}
