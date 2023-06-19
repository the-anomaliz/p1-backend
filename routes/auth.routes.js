import { Router } from 'express';
import { Login, Register } from '../controller/auth.controller.js';
const router = Router();

router.post('/login', Login);
router.post('/register', Register);
router.post('/refreshToken', RefreshToken);

export default router;
