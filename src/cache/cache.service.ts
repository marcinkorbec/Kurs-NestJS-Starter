import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CacheEntity } from './cache.entity';

@Injectable()
export class CacheService {
    constructor(
        @InjectRepository(CacheEntity)
        private cacheRepository: Repository<CacheEntity>,
    ) { }

    async getFromCache(key: string): Promise<any> {
        const cacheEntry = await this.cacheRepository.findOne({ where: { key } });
        return cacheEntry ? cacheEntry.value : null;
    }

    async saveToCache(key: string, value: any, controllerName: string, actionName: string): Promise<void> {
        const cacheEntry = this.cacheRepository.create({ key, value, controllerName, actionName });
        await this.cacheRepository.save(cacheEntry);
    }

    // Metoda do czyszczenia starych wpisów (na podstawie daty utworzenia i czasu życia)
}
