import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/users.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/login')
    async login(@Body() req: AuthLoginDto, @Res() res: Response) {
        return await this.authService.login(req, res);
    }

    @Post('/logout')
    @UseGuards(AuthGuard('jwt'))
    async logout(@Res() res: Response, @User() user: User) {
        return await this.authService.logout(res);
    }
}
