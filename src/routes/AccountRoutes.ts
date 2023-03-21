import express from 'express';
import { create, getAll } from '../controllers/AccountController';
import { verifyToken } from '../middleware/auth';

const router = express.Router();

router.post('/', verifyToken, create);
router.get('/', verifyToken, getAll);

// router.get('/', verifyToken, (_req, res) => {
//     console.log('Hello World!');
//     res.json({ message: 'Hello World!' });
// });

export default router;
