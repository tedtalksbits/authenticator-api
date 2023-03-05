import { Request, Response } from 'express';
import { Account } from '../models/Account';
import { sendRestResponse } from '../middleware/sendRestResponse';

export const create = async (req: Request, res: Response) => {
    const { username, website, logo, userId } = req.body;
    let { password } = req.body;

    if (!username) {
        return sendRestResponse({
            res,
            data: null,
            message: 'Missing required fields',
            status: 400,
        });
    }

    try {
        const result = await Account.create(username, password, website, logo, userId);
        return sendRestResponse({
            res,
            data: result,
            message: 'Account created successfully',
            status: 201,
        });
    } catch (error) {
        return sendRestResponse({
            res,
            data: null,
            message: error.message,
            status: 500,
        });
    }
};
