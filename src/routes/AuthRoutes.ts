import express from 'express';
import { whoAmI } from '../middleware/auth';

const router = express.Router();

router.get('/me', whoAmI);

export default router;
