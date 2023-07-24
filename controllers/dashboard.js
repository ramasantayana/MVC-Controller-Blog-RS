const BlogModal=require('../modals/blog');

const get_dashboard=async(req,res)=>{
    let blogs=await BlogModal.findAll({where:{
        author:req.session.user.id
    }})
    return res.render('my-blog',{blogs,req,})
}

module.exports={
    get_dashboard,
}