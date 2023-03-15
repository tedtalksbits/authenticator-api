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

export const getAll = async (req: Request, res: Response) => {
    // TODO: should we use the userId from the request param or the session? or both?

    const reqUserId = req.query.userId;
    if (!reqUserId) {
        return sendRestResponse({
            res,
            data: null,
            message: 'Missing required field: userId',
            status: 400,
        });
    }
    // TODO: find out why this is a number
    const sessionUserId = req.session?.user?.id.toString();
    if (!sessionUserId) {
        return sendRestResponse({
            res,
            data: null,
            message: 'Missing required field: userId',
            status: 400,
        });
    }

    if (reqUserId !== sessionUserId) {
        req.session = null;

        return sendRestResponse({
            res,
            data: null,
            message: 'Unauthorized',
            status: 401,
        });
    }
    try {
        const result = await Account.findAll(sessionUserId);

        let message = result.length > 0 ? 'Accounts retrieved successfully' : 'No accounts found';
        return sendRestResponse({
            res,
            data: result,
            message: message,
            status: 200,
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
