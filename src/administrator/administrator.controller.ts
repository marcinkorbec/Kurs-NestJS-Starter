import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { PasswordProtectGuard } from 'src/guards/password-protect.guard';

@Controller('admin')
export class AdministratorController {
    constructor(private readonly administratorService: AdministratorService) { }

    @UseGuards(PasswordProtectGuard)
    @Get('/baskets')
    async getAllBasketsWithItems() {
        return await this.administratorService.getAllBasketsWithItems();
    }

    @UseGuards(PasswordProtectGuard)
    @Get('/users')
    async getAllUsers() {
        return await this.administratorService.getAllUsers();
    }
}
