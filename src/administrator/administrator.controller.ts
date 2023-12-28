import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { PasswordProtectGuard } from 'src/guards/password-protect.guard';
import { UsePasswordProtect } from 'src/decorators/use-passwors-decorator';
import { UseCacheTime } from 'src/decorators/use-cache-time.decorator';
//import { MyCacheInterceptor } from '../interceptors/my-cache.interptor';

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
    //@UseInterceptors(MyCacheInterceptor)
    @UseCacheTime(10)
    @Get('/users')
    async getAllUsers() {
        return await this.administratorService.getAllUsers();
    }
}
