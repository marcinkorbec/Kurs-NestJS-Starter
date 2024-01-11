import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as helmet from 'helmet';

// import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // const app = await NestFactory.create(AppModule, {
    //     snapshot: true,
    //   });
    (app as NestExpressApplication).enable('trust proxy');
    (app as NestExpressApplication).use(helmet());
    // app.useGlobalPipes(
    //     new ValidationPipe({
    //         disableErrorMessages: true,

    //         whitelist: true,
    //         forbidNonWhitelisted: true,

    //         transform: true,
    //         transformOptions: {
    //             enableImplicitConversion: true,
    //         },
    //     }),
    // );

    // app.use(cookieParser());

    await app.listen(3000);
}

bootstrap();
