import db from '../config/db';

export class User {
    id: number;
    username: string;
    password: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    firstName: string;
    lastName: string;
    middleName: string;

    constructor(
        id: number,
        username: string,
        password: string,
        email: string,
        createdAt: Date,
        updatedAt: Date,
        firstName: string,
        lastName: string,
        middleName: string
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
    }

    static fromSqlRow(sqlRow: any): User {
        return new User(
            sqlRow.id,
            sqlRow.username,
            sqlRow.firstName,
            sqlRow.lastName,
            sqlRow.middleName,
            sqlRow.password,
            sqlRow.email,
            sqlRow.createdAt,
            sqlRow.updatedAt
        );
    }

    static async create(
        username: string,
        password: string,
        email: string,
        firstName: string,
        lastName: string
    ): Promise<any> {
        try {
            const [rows, _fields] = await db.query(
                'INSERT INTO users (username, password, email, firstName, lastName) VALUES (?, ?, ?, ?, ?)',
                [username, password, email, firstName, lastName]
            );
            return rows;
        } catch (error) {
            throw new Error(`Could not add new user. Error: ${error.message}`);
        }
    }

    // static async getById(id: number): Promise<User | null> {
    //     const [rows, fields] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    //     if (rows.length === 0) {
    //         return null;
    //     }
    //     return User.fromSqlRow(rows[0]);
    // }

    // static async getByUsername(username: string): Promise<User | null> {
    //     const [rows, fields] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    //     if (rows.length === 0) {
    //         return null;
    //     }
    //     return User.fromSqlRow(rows[0]);
    // }
}
