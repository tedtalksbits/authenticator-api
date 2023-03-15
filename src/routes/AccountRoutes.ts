import express from 'express';
import { create, getAll } from '../controllers/AccountController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/', auth, create);
router.get('/', auth, getAll);

router.get('/', auth, (_req, res) => {
    console.log('Hello World!');
    res.json({ message: 'Hello World!' });
});

export default router;
