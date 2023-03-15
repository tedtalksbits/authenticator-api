import db from '../config/db';

export class Account {
    id: number;
    username: string;
    password: string;
    website: string;
    logo: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: number,
        username: string,
        password: string,
        website: string,
        logo: string,
        userId: number,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.website = website;
        this.logo = logo;
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromSqlRow(sqlRow: any): Account {
        return new Account(
            sqlRow.id,
            sqlRow.username,
            sqlRow.password,
            sqlRow.website,
            sqlRow.logo,
            sqlRow.userId,
            sqlRow.createdAt,
            sqlRow.updatedAt
        );
    }

    static async create(
        username: string,
        password: string | null = null,
        website: string | null = null,
        logo: string | null = null,
        userId: number
    ): Promise<Account | null> {
        try {
            const [rows, _fields] = await db.query(
                'INSERT INTO accounts (username, password, website, logo, userId) VALUES (?, ?, ?, ?, ?)',
                [username, password, website, logo, userId]
            );

            return rows;
        } catch (error) {
            throw new Error(`Unable to create account. Error: ${error.message}`);
        }
    }

    static async findAll(userId: string): Promise<Account[]> {
        try {
            const [rows, _fields] = await db.query('SELECT * FROM accounts WHERE userId = ?', [userId]);

            return rows;
        } catch (error) {
            throw new Error(`Unable to get accounts. Error: ${error.message}`);
        }
    }

    static async findOne(id: number): Promise<Account | null> {
        try {
            const [rows, _fields] = await db.query('SELECT * FROM accounts WHERE id = ?', [id]);

            return rows;
        } catch (error) {
            throw new Error(`Unable to get account. Error: ${error.message}`);
        }
    }

    static async update(
        id: number,
        username: string,
        password: string | null = null,
        website: string | null = null,
        logo: string | null = null,
        userId: number
    ): Promise<Account | null> {
        try {
            const [rows, _fields] = await db.query(
                'UPDATE accounts SET username = ?, password = ?, website = ?, logo = ?, userId = ? WHERE id = ?',
                [username, password, website, logo, userId, id]
            );

            return rows;
        } catch (error) {
            throw new Error(`Unable to update account. Error: ${error.message}`);
        }
    }

    static async remove(id: number): Promise<Account | null> {
        try {
            const [rows, _fields] = await db.query('DELETE FROM accounts WHERE id = ?', [id]);

            return rows;
        } catch (error) {
            throw new Error(`Unable to delete account. Error: ${error.message}`);
        }
    }
}
