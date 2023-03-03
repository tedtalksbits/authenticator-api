import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not defined!');
        jwt.verify(token, process.env.JWT_SECRET);
        next();
        return;
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid ' + error.message });
    }
};
