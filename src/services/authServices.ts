import { Role } from '../models/Role';
import db from '../config/db';

export const getRoles = async (): Promise<Role[]> => {
    try {
        const [rows, _fields] = await db.query('SELECT * FROM roles');
        return rows.map((row: any) => Role.fromSqlRow(row));
    } catch (error) {
        throw new Error(`Could not find roles. Error: ${error.message}`);
    }
};
