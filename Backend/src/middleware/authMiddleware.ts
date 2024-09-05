import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract Bearer token

    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    const verified = verifyToken(token);
    if (!verified) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Token is valid, proceed to the next middleware
    next();
}
