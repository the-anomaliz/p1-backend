import { Router } from 'express';
import { Login, Register, RefreshToken } from '../controller/auth.controller.js';
import { validateRefreshToken } from '../middleware/auth.ware.js';
const router = Router();

router.post('/login', Login);
router.post('/register', Register);
router.post('/refreshToken', validateRefreshToken, RefreshToken);

export default router;
