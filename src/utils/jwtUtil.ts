import jwt from 'jsonwebtoken';
import { User } from '../types/user';

const secretKey = 'your_secret_key';

export const createToken = (username: string) => {
    return jwt.sign({ username }, secretKey, { expiresIn: '2h' });
};

export function verifyToken(token: string): User | undefined {
    try {
        const decoded = jwt.verify(token, secretKey) as User;
        return decoded;
    } catch (err) {
        return undefined;
    }
}