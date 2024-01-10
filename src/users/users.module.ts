import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { AdministratorModule } from 'src/administrator/administrator.module';
import { HashingModule } from 'src/hashing-pwd/hashing-pwd.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        forwardRef(() => AdministratorModule),
        forwardRef(() => HashingModule),
    ],
    controllers: [UserController],
    providers: [UsersService],
    exports: [UsersService, TypeOrmModule]
})
export class UsersModule { }
