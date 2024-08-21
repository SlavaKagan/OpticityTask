import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtil';
import { User } from '../types/user';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            const user = verifyToken(token);

            if (user && typeof user !== 'string') { // Ensure `user` is of type `User`
                req.user = user;
                next();
            } else {
                res.sendStatus(403); // Invalid token
            }
        } catch (err) {
            res.sendStatus(403); // Invalid token
        }
    } else {
        res.sendStatus(401); // No token
    }
};