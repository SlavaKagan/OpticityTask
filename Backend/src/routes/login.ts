import { Router, Request, Response } from 'express';
import { hashSync, compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

const router = Router();

interface User {
    username: string;
    password: string;
}

const users: User[] = [
    {
        username: 'lstech',
        password: hashSync('LStech123', 8),
    }
];

// Login route
router.post('/', (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Find user
    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Validate password
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = sign({ username: user.username }, 'your_secret_key', {
        expiresIn: '2h',
    });

    return res.json({ token });
});

export default router;
