import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('request')
export class RequestController {

    @Get()
    myFirstAction(
        @Res() response: Response,
    ) {
        return response.json(['Hello World'])
    }
}
