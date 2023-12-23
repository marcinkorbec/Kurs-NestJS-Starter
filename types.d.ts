import { User } from './src/users/users.entity';

declare module 'express-serve-static-core' {
    interface Request {
        user?: User;
    }
}