import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from 'src/shared/DTOs/create-user.dto';
import { SafeUserResponse } from './DTO/user-response';
import { HashingService } from '../hashing-pwd/hashing-pwd.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private hashingService: HashingService,
    ) { }

    filtering(user: User): SafeUserResponse {
        const { id, login } = user;
        return { id, login };
    }

    // Dodawanie użytkownika
    async createUser(createUserDto: CreateUserDto): Promise<SafeUserResponse> {
        const { login, password } = createUserDto;
        const hashedPassword = await this.hashingService.hashPassword(password);
        const newUser = this.userRepository.create({
            login,
            password: hashedPassword,
        });
        const savedUser = await this.userRepository.save(newUser);
        return this.filtering(savedUser);
    }

    // Edycja użytkownika
    async editUser(
        userId: number,
        newLogin: string,
        newPassword: string,
    ): Promise<SafeUserResponse> {
        const user = await this.userRepository.findOne(userId);

        if (!user) {
            throw new NotFoundException('User not found');
        }
        const hashedPassword = await this.hashingService.hashPassword(newPassword);
        user.login = newLogin;
        user.password = hashedPassword;
        await this.userRepository.save(user);
        return this.filtering(user);
    }

    // logowanie użytkownika
    async loginUser(login: string, password: string): Promise<SafeUserResponse> {
        const user = await this.userRepository.findOne({ login });
        if (!user) {
            throw new NotFoundException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.filtering(user);
    }

    // Usuwanie użytkownika
    async deleteUser(userId: number): Promise<void> {
        const result = await this.userRepository.delete(userId);
        if (result.affected === 0) {
            throw new NotFoundException('User not found');
        }
    }

    // Pobieranie wszystkich użytkowników
    async getAllUsers(): Promise<SafeUserResponse[]> {
        const users: User[] = await this.userRepository.find();
        return users.map(user => this.filtering(user));
    }
}
