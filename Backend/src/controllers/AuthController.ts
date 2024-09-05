import { Request, Response } from 'express';
import { generateToken } from '../utils/jwtUtils';

// Permanent credentials
const USERNAME = 'lstech';
const PASSWORD = 'LStech123';

export async function login(req: Request, res: Response) {
    const { username, password } = req.body;

    if (username === USERNAME && password === PASSWORD) {
        const token = generateToken(username);
        return res.status(200).json({ token });
    } else {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
}