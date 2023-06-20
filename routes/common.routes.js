import { Router } from 'express';
import { Home, UserInfo } from '../controller/common.controller.js';
const router = Router();

router.get('/', Home);
router.get('/user/info', UserInfo);

export default router;
