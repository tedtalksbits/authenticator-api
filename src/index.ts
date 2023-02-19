import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/db';

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auth Routes
app.use('/api/auth', (_req, res) => {
    // test db connection
    const query = 'SELECT * FROM users';
    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(result);
    });
});

//  Protected Routes
app.use('/api/protected', (_req, res) => {
    res.send('Protected Routes');
});

const PORT = process.env.PORT || 5030;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
