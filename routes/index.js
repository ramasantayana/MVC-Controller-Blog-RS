const express=require('express');
const router=express.Router();
const userRouter=require('./auth');
const blogRouter=require('./blog');
const dashboardRouter=require('./dashboard')
const verifyAuth=require('../middleware/auth');

router.get('/',(req,res)=>{
    if(req.session.user){
        return res.redirect('/dashboard')
    }else{
        return res.redirect('/login')
    }
})
router.get('/logout',(req,res)=>{
    req.session.user=null;
    return res.redirect('/login')
})
router.use(userRouter);

//auth middleware start
router.use(verifyAuth)
//auth middleware end

router.use('/blog',blogRouter)
router.use('/dashboard',dashboardRouter)
module.exports=router;