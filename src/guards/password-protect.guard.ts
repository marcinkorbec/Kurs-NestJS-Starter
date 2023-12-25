import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class PasswordProtectGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { password } = request.body;
        return password === '123456';
    }
}
