import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

export function generateToken(username: string): string {
    return jwt.sign({ username }, SECRET_KEY, { expiresIn: '2h' });
}

export function verifyToken(token: string): any {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
}