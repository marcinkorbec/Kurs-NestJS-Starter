import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from 'app.service';
import { TimingInterceptor } from 'timing.decorator';


@Controller()
@UseInterceptors(TimingInterceptor)
export class AppController {
    constructor(private readonly appService: AppService) { }

  @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
