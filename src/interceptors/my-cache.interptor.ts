import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { CacheItem } from '../cache/cache.entity';


@Injectable()
export class MyCacheInterceptor implements NestInterceptor {
    constructor(private reflector: Reflector) { }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const cacheTimeInSec = this.reflector.get<number>('cacheTimeInSec', context.getHandler());
        const controllerName = this.reflector.get<string>('cacheTime', context.getHandler());
        const actionName = context.getHandler().name;

        const cachedResponse = await CacheItem.findOne({
            where: { controllerName, actionName }
        });

        if (cachedResponse) {
            if (new Date(cachedResponse.createdAt).getTime() + cacheTimeInSec * 1000 > Date.now()) {
                console.log('Pobieram dane z cache');
                return of(JSON.parse(cachedResponse.dataJson));
            } else {
                console.log('Czas cache minął');
                await cachedResponse.remove();
            }
        }

        return next.handle().pipe(
            tap(async data => {
                console.log('Zapisuję dane do cache');
                const cacheItem = CacheItem.create({
                    dataJson: JSON.stringify(data),
                    controllerName,
                    actionName,
                    createdAt: new Date()
                });

                try {
                    await CacheItem.save(cacheItem);
                } catch (error) {
                    console.error('Błąd zapisu do cache', error);
                }
            })
        );
    }

    private generateCacheKey(request: any): string {
        return `${request.method}_${request.url}`;
    }
}
