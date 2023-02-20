import { User } from '../models/User';
import { Request, Response } from 'express';

export const createUser = async (req: Request, res: Response) => {
    const { username, password, email, firstName, lastName } = req.body;

    if (!username || !password || !email || !firstName || !lastName) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const result = await User.create(username, password, email, firstName, lastName);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
