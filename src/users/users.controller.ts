import { Controller, Post, Body, Delete, Param, Put, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UsersService) { }

    @Post('/add')
    async addteUser(@Body() body) {
        return await this.userService.createUser(body);
    }

    @Get('/all')
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }

    @Delete('/delete/:id')
    async deleteUser(@Param('id') id: number) {
        return await this.userService.deleteUser(id);
    }

    @Put('/edit/:id')
    async editUser(@Param('id') id: number, @Body() newLogin, @Body() newPassword) {
        return await this.userService.editUser(id, newLogin, newPassword);
    }


}
