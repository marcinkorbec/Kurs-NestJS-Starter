import { Module } from '@nestjs/common';
import { HashingService } from './hashing-pwd.service';

@Module({
  providers: [HashingService],
  exports: [HashingService]
})
export class HashingModule { }
