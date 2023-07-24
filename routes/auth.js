const express=require('express');
const router=express.Router();
const userControler=require('../controllers/users')

router.get('/register',userControler.register_get)
router.get('/login',userControler.login_get)

router.post('/register',userControler.register_post)
router.post('/login',userControler.login_post)

module.exports=router;