import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { sendRestResponse } from './sendRestResponse';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
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
        jwt.verify(token, process.env.JWT_SECRET);

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

// create a middleware that calls auth and then whoAmI

export const verifiedTokenAndAuthorized = async (req: Request, res: Response, next: NextFunction) => {
    await verifyToken(req, res, () => {
        // if userId sent as part of a request, and it doesn't match the userId in the session, then return 401

        console.log('req.session', req.session);

        const { userId: reqQueryUserId } = req.query;
        const { userId: reqBodyUserId } = req.body;
        const { userId: reqParamsUserId } = req.params;

        const sessionUserId = req.session?.user?.id.toString();
        const sessionRoleId = req.session?.user?.roleId;

        const isSuperAdmin = sessionRoleId === '400';

        if (!isSuperAdmin) {
            return sendRestResponse({
                res,
                data: null,
                message: `Unauthorized - role: ${sessionRoleId}`,
                status: 401,
            });
        }

        if (reqQueryUserId && reqQueryUserId.toString() !== sessionUserId) {
            req.session = null;

            return sendRestResponse({
                res,
                data: null,
                message: 'Unauthorized',
                status: 401,
            });
        }

        if (reqBodyUserId && reqBodyUserId.toString() !== sessionUserId) {
            req.session = null;

            return sendRestResponse({
                res,
                data: null,
                message: 'Unauthorized',
                status: 401,
            });
        }

        if (reqParamsUserId && reqParamsUserId.toString() !== sessionUserId) {
            req.session = null;

            return sendRestResponse({
                res,
                data: null,
                message: 'Unauthorized',
                status: 401,
            });
        }

        next();
    });
};
