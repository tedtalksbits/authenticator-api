import { Request, Response } from 'express';
import { Account } from '../models/Account';

export const create = async (req: Request, res: Response) => {
    const { username, website, logo, userId } = req.body;
    let { password } = req.body;

    if (!username) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const result = await Account.create(username, password, website, logo, userId);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
