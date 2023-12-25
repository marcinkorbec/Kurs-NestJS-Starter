import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class PasswordProtectGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const routePassword = this.reflector.get<string>('password', context.getHandler());

        if (!routePassword) {
            throw new HttpException('Brak hasła w metadanych', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const requestPassword = request.headers['x-password'];

        if (routePassword !== requestPassword) {
            throw new HttpException('Zabronione', HttpStatus.FORBIDDEN);
        }

        return true;
    }
}