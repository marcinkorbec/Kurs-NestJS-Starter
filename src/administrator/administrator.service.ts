import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Basket } from 'src/basket/basket.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class AdministratorService {
    constructor(
        @InjectRepository(Basket) private basketRepository: Repository<Basket>,
        private userService: UsersService
    ) { }

    async getAllBasketsWithItems(): Promise<Basket[]> {
        return await this.basketRepository.find({ relations: ['items', 'user'] });
    }

    async getAllUsers() {
        return await this.userService.getAllUsers();
    }
}
