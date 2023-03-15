import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { sendRestResponse } from './sendRestResponse';
export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.session?.user?.token;

    if (!token) {
        return sendRestResponse({
            res,
            data: null,
            message: 'Access denied. No token provided.',
            status: 401,
        });
    }
    try {
        if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not defined!');
        // TODO: create a type for the decoded token
        jwt.verify(token, process.env.JWT_SECRET) as { id: string; username: string };

        next();
        return;
    } catch (error) {
        return sendRestResponse({
            res,
            data: null,
            message: error.message,
            status: 500,
        });
    }
};

export const whoAmI = async (req: Request, res: Response) => {
    const token = req.session?.user?.token;

    if (!token) {
        return sendRestResponse({
            res,
            data: null,
            message: 'Access denied. No token provided.',
            status: 401,
        });
    }
    try {
        if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not defined!');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return sendRestResponse({
            res,
            data: decoded,
            message: 'Token verified',
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
