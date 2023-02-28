import express from 'express';
import { create } from '../controllers/AccountController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/create', auth, create);

export default router;
