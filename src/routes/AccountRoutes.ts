import express from 'express';
import { create } from '../controllers/AccountController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, create);

router.get('/', auth, (req, res) => {
    console.log('Hello World!');
    res.json({ message: 'Hello World!' });
});

export default router;
