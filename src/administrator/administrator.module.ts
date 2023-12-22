import { Module, forwardRef } from '@nestjs/common';
import { AdministratorController } from './administrator.controller';
import { AdministratorService } from './administrator.service';
import { BasketItem } from 'src/basket/basket-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { BasketModule } from 'src/basket/basket.module';
import { UsersModule } from 'src/users/users.module';
import { Basket } from 'src/basket/basket.entity';

@Module({
  imports: [forwardRef(() => BasketModule), forwardRef(() => UsersModule), TypeOrmModule.forFeature([BasketItem, Basket, User])],
  controllers: [AdministratorController],
  providers: [AdministratorService, BasketItem, User],
})
export class AdministratorModule { }