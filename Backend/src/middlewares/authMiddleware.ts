import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtil';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            const user = verifyToken(token);

            if (user && typeof user !== 'string') {
                req.user = user;
                next();
            } else {
                res.sendStatus(403);
            }
        } catch (err) {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(401);
    }
};