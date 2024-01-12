import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { HashingModule } from 'src/hashing-pwd/hashing-pwd.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    HashingModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy]
})
export class AuthModule { }
