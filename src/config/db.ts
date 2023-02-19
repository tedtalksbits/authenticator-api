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

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL');
});

export default db;
