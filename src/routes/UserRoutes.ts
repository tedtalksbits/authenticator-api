import express from 'express';
import { createUser, createUserWithRole, loginUser } from '../controllers/UserController';
import { verifiedTokenAndAuthorized } from '../middleware/auth';
// import { auth } from '../middleware/auth';

const router = express.Router();

// Application Routes
router.post('/login', loginUser);
router.post('/register', verifiedTokenAndAuthorized, createUserWithRole);

// Public Routes
router.post('/', createUser);

// router.get('/logout', logoutUser);

// router.get('/me', auth, getMe);

// router.put('/updatedetails', auth, updateDetails);

export default router;
