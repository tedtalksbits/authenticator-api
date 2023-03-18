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

        // cache request for 5 minutes
        const period = 5 * 60; // 5 minutes
        res.set('Cache-Control', `public, max-age=${period}`);

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
    // example url query: http://localhost:3000/api/accounts?userId=1&orderBy=website&order=ASC

    const { orderBy, order, userId: reqUserId } = req.query;

    if (!reqUserId) {
        return sendRestResponse({
            res,
            data: null,
            message: 'Missing required field: userId',
            status: 400,
        });
    }
    // TODO: find out why this is a number
    // const sessionUserId = req.session?.user?.id.toString();
    // if (!sessionUserId) {
    //     return sendRestResponse({
    //         res,
    //         data: null,
    //         message: 'Missing required field: userId',
    //         status: 400,
    //     });
    // }

    // if (reqUserId !== sessionUserId) {
    //     req.session = null;

    //     return sendRestResponse({
    //         res,
    //         data: null,
    //         message: 'Unauthorized',
    //         status: 401,
    //     });
    // }
    try {
        const result = await Account.findAll(reqUserId as string, orderBy as string, order as string);

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
