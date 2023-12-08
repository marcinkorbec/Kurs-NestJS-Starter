import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimingInterceptor } from './timing.decorator';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestowyModule } from './testowy/testowy.module';
import { FoxController } from './fox/fox.controller';
import { RequestController } from './request/request.controller';

@Module({
    imports: [
        // TypeOrmModule.forRoot(),
    TestowyModule],
    controllers: [AppController, FoxController, RequestController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: TimingInterceptor,
        }
    ],
})
export class AppModule {
}
