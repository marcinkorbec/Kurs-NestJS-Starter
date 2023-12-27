import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { CacheItem } from 'src/cache/cache.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MyCacheInterceptor implements NestInterceptor {
    constructor(
        private reflector: Reflector,
        @InjectRepository(CacheItem)
        private cacheRepository: Repository<CacheItem>, // Wstrzyknięcie repozytorium
    ) { }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const cachedData = await new CacheItem();
        const cacheTimeInSec = this.reflector.get<number>('cacheTimeInSec', context.getHandler())
        const controllerName = this.reflector.get<string>('cacheTime', context.getHandler())
        const actionName = context.getHandler().name;

        const cachedResponse = await CacheItem.findOne(
            {
                where: {
                    controllerName,
                    actionName
                }
            }
        );
        if (cachedResponse) {
            if (+cachedData.createdAt + +cacheTimeInSec * 1000 > Date.now()) {
                console.log('Pobieram dane z cache');
                return of(JSON.parse(cachedData.dataJson));
            } else {
                console.log('Czas cache minął');
                await cachedData.remove();
            }
        }


        return next.handle().pipe(
            tap(async data => {
                console.log('Zapisuję dane do cache');
                const cacheItem = this.cacheRepository.create({
                    dataJson: JSON.stringify(data),
                    controllerName: controllerName,
                    actionName: actionName,
                    // ustawienie createdAt na obecną datę i czas
                });

                try {
                    await this.cacheRepository.save(cacheItem);
                } catch (error) {
                    console.error('Błąd zapisu do cache', error);
                }
                return data;
            })
        );

    }

    private generateCacheKey(request: any): string {
        return `${request.method}_${request.url}`;
    }
}
