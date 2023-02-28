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
        password: string,
        website: string,
        logo: string,
        userId: number
    ): Promise<Account | null> {
        try {
            const result = await db.query(
                'INSERT INTO accounts (username, password, website, logo, userId) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [username, password, website, logo, userId]
            );

            if (result.rowCount < 1) {
                return null;
            }
            return Account.fromSqlRow(result.rows[0]);
        } catch (error) {
            throw new Error(`Unable to create account. Error: ${error.message}`);
        }
    }
}
