import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/shared/DTOs/create-user.dto';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    // Metoda do hashowania hasła
    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(password, salt);
    }

    // Dodawanie użytkownika
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { login, password } = createUserDto;
        const hashedPassword = await this.hashPassword(password);
        const newUser = this.userRepository.create({ login, password: hashedPassword });
        return this.userRepository.save(newUser);
    }

    // Edycja użytkownika
    async editUser(userId: number, newLogin: string, newPassword: string): Promise<User> {
        const user = await this.userRepository.findOne(userId);

        if (!user) {
            throw new NotFoundException('User not found');
        }
        const hashedPassword = await this.hashPassword(newPassword);
        user.login = newLogin;
        user.password = hashedPassword;
        return this.userRepository.save(user);
    }

    // logowanie użytkownika
    async loginUser(login: string, password: string): Promise<User> {
        const user = await this.userRepository.findOne({ login });
        if (!user) {
            throw new NotFoundException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return user;
    }

    // Usuwanie użytkownika
    async deleteUser(userId: number): Promise<void> {
        const result = await this.userRepository.delete(userId);
        if (result.affected === 0) {
            throw new NotFoundException('User not found');
        }
    }

    // Pobieranie wszystkich użytkowników
    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

}


