const router=require('express').Router();
const dashboardController=require('../controllers/dashboard')

router.get('/',dashboardController.get_dashboard)

module.exports=router;