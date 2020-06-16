import { Router } from 'express';
import blog from './blog.routes';
import user from './user.routes';
import UserController from '../controllers/UserController';
import { checkToken } from './../middlewares/TokenValidation';
const router = new Router();

router.use('/blog', blog);
router.use('/user', user);
// router.use('/login', UserController.login );

export default router;