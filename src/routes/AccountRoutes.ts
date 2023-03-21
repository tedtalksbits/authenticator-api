import express from 'express';
import { create, getAll } from '../controllers/AccountController';
import { verifyToken, verifiedTokenAndAuthorized } from '../middleware/auth';

const router = express.Router();

router.post('/', verifiedTokenAndAuthorized, create);
router.get('/', verifiedTokenAndAuthorized, getAll);

// router.get('/', verifyToken, (_req, res) => {
//     console.log('Hello World!');
//     res.json({ message: 'Hello World!' });
// });

export default router;
