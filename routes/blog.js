const router=require('express').Router();
const blogController=require('../controllers/blog')


router.get('/',blogController.get_blogs)
router.get('/detail/:id',blogController.get_blog_detail)
router.post('/detail/:id',blogController.create_comment)
router.get('/edit/:id',blogController.get_edit_blog)
router.post('/edit/:id',blogController.update_blog)
router.get('/create',blogController.get_create_blog)
router.post('/create',blogController.post_create_blog)

module.exports=router;