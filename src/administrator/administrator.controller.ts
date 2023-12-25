import { Controller, Get } from '@nestjs/common';
import { AdministratorService } from './administrator.service';

@Controller('admin')
export class AdministratorController {
    constructor(private readonly administratorService: AdministratorService) { }

    @Get('/baskets')
    async getAllBasketsWithItems() {
        return await this.administratorService.getAllBasketsWithItems();
    }

    @Get('/users')
    async getAllUsers() {
        return await this.administratorService.getAllUsers();
    }
}
