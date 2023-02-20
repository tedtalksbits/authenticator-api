import { User } from '../models/User';
import { Request, Response } from 'express';

export const createUser = async (req: Request, res: Response) => {
    const { username, password, email, firstName, lastName } = req.body;

    if (!username || !password || !email || !firstName || !lastName) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    /*
        :TODO: encrypt password
        
    */

    try {
        const result = await User.create(username, password, email, firstName, lastName);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    /*
        :TODO: Add validation for username and password
        :TODO: Add JWT token
        :TODO: Add bcrypt for password

    */
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const result = await User.findByUsername(username);
        console.log(result);

        if (!result) {
            return res.status(400).json({ message: `Could not find user with username: ${username}` });
        }

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
