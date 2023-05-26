import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import dotenv, { config } from 'dotenv';
import userRoutes from './routes/UserRoutes';
import accountRoutes from './routes/AccountRoutes';
import authRoutes from './routes/AuthRoutes';
import complianceIncidentRoutes from './routes/IncidentsRoutes';
import appConfig from './config/app';
const app = express();
dotenv.config();

// Middleware
app.use(
  cors({
    origin: ['http://192.168.71.120:4173', 'http://192.168.71.120:4174'],
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
app.use('/incidents', complianceIncidentRoutes);

// Protected Routes
app.use('/accounts', accountRoutes);

const PORT = process.env.PORT || 5030;

const app_url = appConfig.app_url;

console.log('app_url', app_url);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
