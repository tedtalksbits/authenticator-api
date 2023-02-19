"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
const db = mysql2_1.default.createConnection({
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
exports.default = db;
//# sourceMappingURL=db.js.map