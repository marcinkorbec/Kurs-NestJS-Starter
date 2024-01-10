import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { User } from 'src/users/users.entity';

export interface JwtPayload {
    id: string;
    login: string;
}

function cookieExtractor(req: any): null | string {
    return (req && req.cookies) ? (req.cookies?.jwt ?? null) : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: cookieExtractor,,
            secretOrKey: 'iwfygluylsycbidcwIFJFAIFVBSDCIUSDFAIUSDVHIAUSDVNDAFYVUSVSsdvn', // Replace with your own secret key
        });
    }

    async validate(payload: JwtPayload, done: (err: Error, user: User) => void) {
        if (!payload || !payload.id) {
            return done(new UnauthorizedException(), null);
        }
        const user = await User.findOne({ currentTokenId: payload.id })
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
