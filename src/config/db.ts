import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.MYSQL_HOST) {
    throw new Error('MYSQL_HOST is not defined');
}

if (!process.env.MYSQL_USER) {
    throw new Error('MYSQL_USER is not defined');
}

if (!process.env.MYSQL_PASS) {
    throw new Error('MYSQL_PASS is not defined');
}

if (!process.env.MYSQL_DB) {
    throw new Error('MYSQL_DB is not defined');
}

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    maxIdle: 10,
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
});

const db = pool.promise();

export default db;
