import { Router } from 'express';
import controller from '../controller/common.controller.js';
import { validateAccesstoken } from '../middleware/auth.ware.js';
const router = Router();

router.get('/', controller.Home);
router.get('/user/info', validateAccesstoken, controller.UserInfo);
router.get('/profile/me', validateAccesstoken, controller.FetchProfileInfo);
router.post('/profile/me', validateAccesstoken, controller.UpdateProfileInfo);
router.post('/org', validateAccesstoken, controller.createOrganisation);

router.post('/create/post', validateAccesstoken, controller.createPost);
router.get('/fetch/post/me', validateAccesstoken, controller.fetchPost);
router.get('/fetch/post/tag', validateAccesstoken, controller.fetchPostBytag);

export default router;
