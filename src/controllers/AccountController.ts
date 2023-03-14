import { Request, Response } from 'express';
import { Account } from '../models/Account';
import { sendRestResponse } from '../middleware/sendRestResponse';

export const create = async (req: Request, res: Response) => {
    let { username, website, logo, userId, password } = req.body;

    if (!username) {
        return sendRestResponse({
            res,
            data: null,
            message: 'Missing required field: username',
            status: 400,
        });
    }
    if (!userId) {
        return sendRestResponse({
            res,
            data: null,
            message: 'Missing required field: userId',
            status: 400,
        });
    }

    // TODO: encrypt password

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
