import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import userRoutes from './routes/UserRoutes';
import accountRoutes from './routes/AccountRoutes';
import authRoutes from './routes/AuthRoutes';
const app = express();
dotenv.config();

// Middleware
app.use(
    cors({
        origin: 'http://127.0.0.1:5173',
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(
    cookieSession({
        name: 'session',
        secret: process.env.SESSION_SECRET,
    })
);

// Auth Routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

// Protected Routes
app.use('/accounts', accountRoutes);

const PORT = process.env.PORT || 5030;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
