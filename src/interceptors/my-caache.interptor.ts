import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class MyCacheInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // Przed wykonaniem żądania

        const request = context.switchToHttp().getRequest();
        const cacheKey = this.generateCacheKey(request);

        // Sprawdź, czy odpowiedź jest już w pamięci podręcznej
        const cachedResponse = this.getFromCache(cacheKey);
        if (cachedResponse) {
            return of(cachedResponse);
        }

        // Wykonaj żądanie
        return next.handle().pipe(
            tap(response => {
                // Zapisz odpowiedź do pamięci podręcznej
                this.saveToCache(cacheKey, response);
                console.log('Zapisano odpowiedź do pamięci podręcznej');
            })
        );
    }

    private generateCacheKey(request: any): string {
        // Wygeneruj unikalny klucz dla żądania
        // Możesz użyć np. URL, metody HTTP, nagłówków itp.
        return `${request.method}_${request.url}`;
    }

    private getFromCache(key: string): any {
        // Pobierz odpowiedź z pamięci podręcznej na podstawie klucza
        // Zwróć null, jeśli odpowiedź nie istnieje w pamięci podręcznej
        // Implementacja zależy od wybranej technologii do pamięci podręcznej
        // np. Redis, Memcached, lokalna pamięć podręczna itp.
        // Przykład:
        // return cache.get(key);
        return null;
    }

    private saveToCache(key: string, value: any): void {
        // Zapisz odpowiedź do pamięci podręcznej na podstawie klucza
        // Implementacja zależy od wybranej technologii do pamięci podręcznej
        // np. Redis, Memcached, lokalna pamięć podręczna itp.
        // Przykład:
        // cache.set(key, value);
    }
}
