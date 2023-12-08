import { Controller, Get, Headers, Ip } from '@nestjs/common';

@Controller('fox')
export class FoxController {
    @Get()
    myFirsAction(
        @Headers('accept-encoding') encoding: string,
        @Ip() ip: string,
    ) {
        return `<H1>Twój Adres IP to: ${ip}</H1>`
    }
}
