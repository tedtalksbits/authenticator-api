import { validateEmail, validateName, validatePassword, validateUsername } from '../lib/Validator';
import { User } from '../models/User';
import { Request, Response } from 'express';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import { sendRestResponse } from '../middleware/sendRestResponse';

export const createUser = async (req: Request, res: Response) => {
    const { username, email, firstName, lastName } = req.body;
    let { password } = req.body;

    if (!username || !password || !email || !firstName || !lastName) {
        return sendRestResponse({
            res,
            data: null,
            message: 'Missing required fields',
            status: 400,
        });
    }

    /*
        :TODO: encrypt password
        
    */

    const userExist = await User.findByUsername(username);

    if (userExist) {
        return sendRestResponse({
            res,
            data: null,
            message: `User with username: ${username} already exists`,
            status: 400,
        });
    }

    const emailExist = await User.findByEmail(email);

    if (emailExist) {
        return sendRestResponse({
            res,
            data: null,
            message: `User with email: ${email} already exists`,
            status: 400,
        });
    }

    // validate username

    const { error: usernameError, message: usernameErrMsg } = validateUsername(username);
    const { error: emailError, message: emailErrMsg } = validateEmail(email);
    const { error: passwordError, message: passwordErrMsg } = validatePassword(password);
    const { error: firstNameError, message: firstNameErrMsg } = validateName(firstName);
    const { error: lastNameError, message: lastNameErrMsg } = validateName(lastName);

    if (usernameError || emailError || passwordError || firstNameError || lastNameError) {
        return sendRestResponse({
            res,
            data: null,
            message: `
                ${usernameError ? usernameErrMsg : ''} 
                ${emailError ? emailErrMsg : ''} 
                ${passwordError ? passwordErrMsg : ''} 
                ${firstNameError ? firstNameErrMsg : ''} 
                ${lastNameError ? lastNameErrMsg : ''}
            `,
            status: 400,
        });
    }

    // encrypt password

    let hash = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY || password.splice(0, 8)).toString(); // TODO: change this to a better encryption method

    password = hash;

    try {
        const result = await User.create(username, password, email, firstName, lastName);
        return sendRestResponse({ res, data: result, message: 'User created', status: 201 });
    } catch (error) {
        return sendRestResponse({ res, data: null, message: error.message, status: 500 });
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
        return sendRestResponse({
            res,
            data: null,
            status: 400,
            message: 'Missing required fields',
        });
    }

    try {
        const user = await User.findByUsername(username);
        console.log(user);

        if (!user) {
            return sendRestResponse({
                res,
                data: null,
                status: 400,
                message: `Could not find user with username: ${username}`,
            });
        }

        // decrypt password
        const decryptedPw = CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRET_KEY || password.splice(0, 8)
        ).toString(CryptoJS.enc.Utf8);

        if (password !== decryptedPw) {
            return sendRestResponse({
                res,
                data: null,
                status: 400,
                message: 'Invalid password',
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
            },
            process.env.JWT_SECRET || password.splice(0, 8),
            { expiresIn: '1h' }
        );

        res.cookie('access_token', token, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 3600000 });

        return sendRestResponse({
            res,
            data: { id: user.id, username: user.username },
            message: 'Login successful',
            status: 200,
        });
    } catch (error) {
        return sendRestResponse({ res, data: null, message: error.message, status: 500 });
    }
};
