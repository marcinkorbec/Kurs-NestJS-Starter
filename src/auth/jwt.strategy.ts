import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { User } from 'src/users/users.entity';

export interface JwtPayload {
    id: string;
}

function cookieExtractor(req: any): null | string {
    return (req && req.cookies) ? (req.cookies?.jwt ?? null) : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: cookieExtractor,
            secretOrKey: 'testowyklucz',
        });
    }

    //tam metoda sprawdza czy
    async validate(payload: JwtPayload, done: (err: Error, user: User) => void) {
        console.log(payload);

        if (!payload || !payload.id) {
            return done(new UnauthorizedException(), null);
        }
        const user = await User.findOne({ currentTokenId: payload.id })
        if (!user) {
            throw new UnauthorizedException();
        }
        console.log(user);
        return user;
    }
}
