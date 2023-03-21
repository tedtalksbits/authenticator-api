import { User } from '../models/User';
import db from '../config/db';

export const insertOne = async (username: string, password: string, roleId?: string): Promise<User | null> => {
    console.log('insertOne');
    const query = roleId
        ? 'INSERT INTO users (username, password, role_id) VALUES (?, ?, ?)'
        : 'INSERT INTO users (username, password) VALUES (?, ?)';
    console.log(query);
    try {
        const [rows, _fields] = await db.query(query, [username, password, roleId]);
        return rows;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const findByUsername = async (username: string): Promise<User | null> => {
    try {
        const [rows, _fields] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) {
            return null;
        }
        console.log('findByUsername - rows', rows);
        return User.fromSqlRow(rows[0]);
    } catch (error) {
        console.log(error);
        console.log(error.stack);
        console.log(error.code);
        console.log(error.errno);
        console.log(error.sqlState);
        console.log(error.sqlMessage);
        console.log(error.sql);

        throw new Error(error);
    }
};

export const findByEmail = async (email: string): Promise<User | null> => {
    try {
        const [rows, _fields] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return null;
        }
        return User.fromSqlRow(rows[0]);
    } catch (error) {
        throw new Error(`Could not find user. Error: ${error.message}`);
    }
};
