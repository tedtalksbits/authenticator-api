export type SqlError = {
    code: string;
    errno: number;
    sqlMessage: string;
    sqlState: string;
    sql: string;
};

declare module 'mysql2' {
    // interface Connection {
    //     execute: (query: string, values: any[], callback: (err: SqlError, result: any) => void) => void;
    // }

    // interface Connection {
    //     query: (query: string, values: any[], callback: (err: SqlError, result: any) => void) => void;
    // }

    interface Pool {
        query: (query: string, values: any[], callback: (err: SqlError, result: any) => void) => void;
    }
}
