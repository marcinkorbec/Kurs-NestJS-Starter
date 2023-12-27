import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class MyCacheInterceptor implements NestInterceptor {
    constructor(private cacheService: CacheService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const cacheKey = this.generateCacheKey(request);
        const controllerName = context.getClass().name;
        const actionName = context.getHandler().name;

        const cachedResponse = this.cacheService.getFromCache(cacheKey);
        if (cachedResponse) {
            return of(cachedResponse);
        }

        return next.handle().pipe(
            tap(response => {
                this.cacheService.saveToCache(cacheKey, response, controllerName, actionName);
            })
        );
    }

    private generateCacheKey(request: any): string {
        return `${request.method}_${request.url}`;
    }
}
