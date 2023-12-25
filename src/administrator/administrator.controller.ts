import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { PasswordProtectGuard } from 'src/guards/password-protect.guard';
import { UsePasswordProtect } from 'src/decorators/use-passwors-decorator';

@Controller('admin')
export class AdministratorController {
    constructor(private readonly administratorService: AdministratorService) { }

    @UseGuards(PasswordProtectGuard)
    @UsePasswordProtect('admin1')
    @Get('/baskets')
    async getAllBasketsWithItems() {
        return await this.administratorService.getAllBasketsWithItems();
    }

    @UseGuards(PasswordProtectGuard)
    @UsePasswordProtect('admin2')
    @Get('/users')
    async getAllUsers() {
        return await this.administratorService.getAllUsers();
    }
}
