import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('request')
export class RequestController {

    @Get()
    myFirstAction() {
        return {
            name: 'Marcin',
            surname: 'Korbecki',
            age: 35
        }
    }
}
