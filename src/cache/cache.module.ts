import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheService } from './cache.service';
import { CacheItem } from './cache.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CacheItem])],
  providers: [CacheService],
  exports: [CacheService]
})
export class CacheModule { }
