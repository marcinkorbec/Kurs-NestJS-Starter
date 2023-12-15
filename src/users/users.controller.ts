import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    async getUsers(): Promise<any> {
        return {
            users: [
                {
                    id: 1,
                    name: 'John',
                    surname: 'Doe',
                    email: ''
                }
            ]
        };
    }
}
