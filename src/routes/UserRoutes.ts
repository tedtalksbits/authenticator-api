import express from 'express';
import { createUser } from '../controllers/UserController';
// import { auth } from '../middleware/auth';

const router = express.Router();

// Auth Routes

router.post('/register', createUser);

// router.post('/login', loginUser);

// router.get('/logout', logoutUser);

// router.get('/me', auth, getMe);

// router.put('/updatedetails', auth, updateDetails);

export default router;
