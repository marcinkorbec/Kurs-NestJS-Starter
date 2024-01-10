import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/users/users.entity';
import { AuthLoginDto } from './dto/auth-login.dto';
import { HashingService } from '../hashing-pwd/hashing-pwd.service';


@Injectable()
export class AuthService {

    constructor(
        private hashingService: HashingService
    ) { }

    async login(req: AuthLoginDto, res: Response): Promise<any> {
        try {
            const user = await User.findOne({ login: req.login, password: req.password });
            if (!user) {
                return res.json({ message: 'Invalid credentials' });
            }
            const token = await this.createToken(await this.generateToken(user));

            return res
                .cookie('jwt', token.accessToken,
                    {
                        secure: false,
                        domain: 'localhost',
                        httpOnly: true
                    })
                .json({ message: 'Success' });
        } catch (error) {
            return res.json({ message: error.message });
        }
    }
}
