import { Router } from 'express';
import contoller from '../controller/auth.controller.js';
import { validateRefreshToken, validateAccesstoken } from '../middleware/auth.ware.js';
const router = Router();

router.post('/login', contoller.Login);
router.post('/register', contoller.Register);
router.post('/refreshToken', validateRefreshToken, contoller.RefreshToken);
router.post('/activeStatus', validateAccesstoken, contoller.ActiveStatus);

export default router;
