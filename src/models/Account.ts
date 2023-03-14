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
}
