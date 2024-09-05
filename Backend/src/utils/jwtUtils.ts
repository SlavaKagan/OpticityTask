import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

// Function to generate a JWT token with a 2-hour expiration
export function generateToken(username: string): string {
    return jwt.sign({ username }, SECRET_KEY, { expiresIn: '2h' });
}

// Function to verify the JWT token
export function verifyToken(token: string): any {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
}