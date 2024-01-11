import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/users/users.entity';
import { AuthLoginDto } from './dto/auth-login.dto';
import { HashingService } from '../hashing-pwd/hashing-pwd.service';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {

    constructor(
        private hashingService: HashingService
    ) { }

    private createToken(currentTokenId: string): { accessToken: string, expiresIn: number } {
        const payload = { id: currentTokenId };
        const expiresIn = 60 * 60 * 24 * 30;
        const accessToken = sign(payload, 'iwfygluylsycbidcwIFJFAIFVBSDCIUSDFAIUSDVHIAUSDVNDAFYVUSVSsdvn', { expiresIn });
        return {
            accessToken,
            expiresIn
        };
    }

    private async generateToken(user: User): Promise<string> {
        let token;
        let userWithThisToken = null;
        do {
            token = uuid();
            userWithThisToken = await User.findOne({ currentTokenId: token });
        } while (!!userWithThisToken);
        user.currentTokenId = token;
        await user.save();
        return token;
    }

    async login(req: AuthLoginDto, res: Response): Promise<any> {
        try {
            const user = await User.findOne({ login: req.login });
            if (!user) {
                return res.json({ message: 'Invalid credentials' });
            }

            const isPasswordValid = await this.hashingService.comparePassword(req.password, user.password);
            if (!isPasswordValid) {
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
