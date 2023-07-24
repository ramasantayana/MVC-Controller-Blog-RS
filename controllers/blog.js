const BlogModal=require('../modals/blog')
const UserModal=require('../modals/users')
const CommentModal=require('../modals/comment')
const get_blogs=async(req,res)=>{
    let blogs=await BlogModal.findAll({
        include:[{model:UserModal}]
    })
    let blogsJSON = blogs.map(blog => blog.toJSON()).map(obj=>({...obj,createdAt:new Date(obj.createdAt).toLocaleDateString()}));
    return res.render('blogs',{blogs:blogsJSON,req})
}

const get_blog_detail=async(req,res)=>{
    const {id}=req.params;
    let blog=await BlogModal.findOne({
        where:{
            id
        },
        include:[{model:UserModal}]
    })
    let comments=await CommentModal.findAll({
        where:{
            blog_ref:id
        },
        include:[
            {model:UserModal},
            {model:BlogModal}]
    })
    blog = blog.toJSON();
    blog.createdAt=new Date(blog.createdAt).toLocaleDateString()
    comments = comments.map(obj => obj.toJSON()).map(obj=>({...obj,createdAt:new Date(obj.createdAt).toLocaleDateString()}));
    return res.render('blog-details',{blog,comments,title:"Create New",req,})
}

const get_create_blog=(req,res)=>{
    return res.render('blog-create-edit',{req})
}
const post_create_blog=async(req,res)=>{
    const {title,content}=req.body;
    let blog=await BlogModal.create({
        title:title,
        content:content,
        author:req.session.user.id
    })
    return res.redirect('/dashboard')
}

const get_edit_blog=async(req,res)=>{
    let {id}=req.params;
    let blog=await BlogModal.findOne({
        where:{
            id:id
        }
    });
    blog=blog.toJSON()
    return res.render('blog-create-edit',{blog,title:'Edit ',req,})
}

const update_blog=async(req,res)=>{
    let {id}=req.params;
    let blog=await BlogModal.findOne({
        where:{
            id:id
        }
    });

    if(blog.author!=req.session.user.id){
        req.session.user=null;
        return redirect('/login')
    }

    const {title,content}=req.body;
    blog.title=title;
    blog.content=content;
    await blog.save();
    return res.redirect('/dashboard')
}


const create_comment=async(req,res)=>{
    const {id}=req.params;
    const {content}=req.body;
    await CommentModal.create({
        content:content,
        blog_ref:id,
        comment_by:req.session.user.id 
    })
    return res.redirect('/blog/detail/'+id)
}
module.exports={
    get_blogs,
    get_blog_detail,
    get_create_blog,
    post_create_blog,
    create_comment,
    update_blog,
    get_edit_blog,
}