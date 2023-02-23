import { validateEmail, validateName, validatePassword, validateUsername } from '../lib/Validator';
import { User } from '../models/User';
import { Request, Response } from 'express';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

export const createUser = async (req: Request, res: Response) => {
    const { username, email, firstName, lastName } = req.body;
    let { password } = req.body;

    if (!username || !password || !email || !firstName || !lastName) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    /*
        :TODO: encrypt password
        
    */

    const userExist = await User.findByUsername(username);

    if (userExist) {
        return res.status(400).json({ message: `User with username: ${username} already exists` });
    }

    const emailExist = await User.findByEmail(email);

    if (emailExist) {
        return res.status(400).json({ message: `User with email: ${email} already exists` });
    }

    // validate username

    const { error: usernameError, message: usernameErrMsg } = validateUsername(username);
    const { error: emailError, message: emailErrMsg } = validateEmail(email);
    const { error: passwordError, message: passwordErrMsg } = validatePassword(password);
    const { error: firstNameError, message: firstNameErrMsg } = validateName(firstName);
    const { error: lastNameError, message: lastNameErrMsg } = validateName(lastName);

    if (usernameError || emailError || passwordError || firstNameError || lastNameError) {
        return res.status(400).json({
            message: 'Invalid input',
            errors: {
                username: usernameErrMsg,
                email: emailErrMsg,
                password: passwordErrMsg,
                firstName: firstNameErrMsg,
                lastName: lastNameErrMsg,
            },
        });
    }

    // encrypt password

    let hash = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY || password.splice(0, 8)).toString(); // TODO: change this to a better encryption method

    password = hash;

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
        const user = await User.findByUsername(username);
        console.log(user);

        if (!user) {
            return res.status(400).json({ message: `Could not find user with username: ${username}` });
        }

        // decrypt password
        const decryptedPw = CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRET_KEY || password.splice(0, 8)
        ).toString(CryptoJS.enc.Utf8);

        if (password !== decryptedPw) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // add JWT token

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
            },
            process.env.JWT_SECRET || password.splice(0, 8),
            { expiresIn: '1h' }
        );

        return res.status(200).cookie('token', token, { httpOnly: true }).json({ message: 'Login successful' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
