import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TimingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        const handlerName = context.getClass().name + '.' + context.getHandler().name;

        return next
            .handle()
            .pipe(
                tap(() => console.log(`[${handlerName}] - Execution time: ${Date.now() - now}ms`))
            );
    }
}