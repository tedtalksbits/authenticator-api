import { validatePassword, validateUsername } from '../lib/Validator';
import { Request, Response } from 'express';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import { sendRestResponse } from '../middleware/sendRestResponse';
import { findByUsername, insertOne } from '../services/userServices';

export const createUser = async (req: Request, res: Response) => {
    const { username } = req.body;
    let { password } = req.body;

    if (!username || !password) {
        return sendRestResponse({
            res,
            data: null,
            message: 'Missing required fields',
            status: 400,
        });
    }

    try {
        const userExist = await findByUsername(username);
        if (userExist) {
            return sendRestResponse({
                res,
                data: null,
                message: `User with username: ${username} already exists`,
                status: 400,
            });
        }
    } catch (error) {
        return sendRestResponse({
            res,
            data: null,
            message: 'Could not create user',
            status: 500,
        });
    }

    // validate username

    const { error: usernameError, message: usernameErrMsg } = validateUsername(username);
    const { error: passwordError, message: passwordErrMsg } = validatePassword(password);

    if (usernameError || passwordError) {
        return sendRestResponse({
            res,
            data: null,
            message: `${usernameError ? usernameErrMsg : ''}${passwordError ? passwordErrMsg : ''}`,
            status: 400,
        });
    }

    // encrypt password

    let hash = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY || password.splice(0, 8)).toString();

    password = hash;

    try {
        const result = await insertOne(username, password);
        return sendRestResponse({
            res,
            data: result,
            message: 'User created',
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

export const createUserWithRole = async (req: Request, res: Response) => {
    const { username, role_id } = req.body;
    let { password } = req.body;

    if (!username || !password || !role_id) {
        return sendRestResponse({
            res,
            data: null,
            message: 'Missing required fields',
            status: 400,
        });
    }

    try {
        const userExist = await findByUsername(username);
        if (userExist) {
            return sendRestResponse({
                res,
                data: null,
                message: `User with username: ${username} already exists`,
                status: 400,
            });
        }
    } catch (error) {
        console.log('could not find user, db error');
        return sendRestResponse({
            res,
            data: null,
            message: 'Could not create user',
            status: 500,
        });
    }

    // validate username

    const { error: usernameError, message: usernameErrMsg } = validateUsername(username);
    const { error: passwordError, message: passwordErrMsg } = validatePassword(password);

    if (usernameError) {
        return sendRestResponse({
            res,
            data: null,
            message: `${usernameError ? usernameErrMsg : ''}${passwordError ? passwordErrMsg : ''}`,
            status: 400,
        });
    }

    // encrypt password

    let hash = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY || password.splice(0, 8)).toString();

    password = hash;

    try {
        const result = await insertOne(username, password, role_id);
        return sendRestResponse({
            res,
            data: result,
            message: 'User created',
            status: 201,
        });
    } catch (error) {
        console.log('could not create user, db error');
        return sendRestResponse({
            res,
            data: null,
            message: 'Could not create user',
            status: 500,
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body as { username: string; password: string }

    if (!username || !password) {
        return sendRestResponse({
            res,
            data: null,
            status: 400,
            message: 'Missing required fields',
        });
    }

    try {
        const user = await findByUsername(username);
        console.log(user);

        if (!user) {
            return sendRestResponse({
                res,
                data: null,
                status: 400,
                message: `Could not find user with username: ${username}`,
            });
        }

        const decryptedPw = CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRET_KEY || password.slice(0, 8)
        ).toString(CryptoJS.enc.Utf8);

        if (password !== decryptedPw) {
            req.session = null;
            return sendRestResponse({
                res,
                data: null,
                status: 401,
                message: 'Invalid password',
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                roleId: user.role_id,
            },
            process.env.JWT_SECRET || password.slice(0, 8),
            { expiresIn: '1h' }
        );

        req.session = {
            user: {
                id: user.id,
                username: user.username,
                roleId: user.role_id,
                token,
            },
        };

        console.log(req.session);

        // res.cookie('access_token', token, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 3600000 });

        return sendRestResponse({
            res,
            data: { id: user.id, username: user.username, roleId: user.role_id },
            message: 'Login successful',
            status: 200,
        });
    } catch (error) {
        return sendRestResponse({ res, data: null, message: error.message, status: 500 });
    }
};
