import { checkValidity } from './../middlewares/Validators';
import { Router } from 'express';
import BlogController from '../controllers/BlogController';

const router = Router();

router.get('/', BlogController.getAll);
router.get('/:id', BlogController.getSingleBlog);
router.post('/', [checkValidity], BlogController.createBlog );
router.put('/:id', BlogController.updateBlog);
router.delete('/:id', BlogController.deleteBlog);

export default router;