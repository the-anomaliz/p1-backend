import { Router } from 'express';
import { Home, UserInfo } from '../controller/common.controller.js';
import { validateAccesstoken } from '../middleware/auth.ware.js';
const router = Router();

router.get('/', Home);
router.get('/user/info', validateAccesstoken, UserInfo);

export default router;
