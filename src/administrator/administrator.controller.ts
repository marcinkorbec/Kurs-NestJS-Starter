import { Controller, Get } from '@nestjs/common';
import { AdministratorService } from './administrator.service';

@Controller('administrator')
export class AdministratorController {
    constructor(private readonly administratorService: AdministratorService) { }

    @Get('/baskets')
    async getAllBasketsWithItems() {
        return await this.administratorService.getAllBasketsWithItems();
    }
}
