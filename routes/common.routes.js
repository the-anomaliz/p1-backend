import { Router } from 'express';
import { Home } from '../controller/common.controller.js';
const router = Router();

router.get('/', Home);

export default router;
