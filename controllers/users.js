const User=require('../modals/users');
const bcrypt=require('bcrypt');

const register_get=async(req,res)=>{
    if(req.session.cookie.user){
        return res.redirect('/dashboard')
    }
    return res.render('register');
}

const register_post=async(req,res)=>{
    const {name,email,password}=req.body;
    try{
       let user=await User.findOne({where:{email:email}});
       if(user){
        return res.render('register',{err:"email already exists ",name,email})
       }
       let salt=bcrypt.genSaltSync(10);
       let hashpassword=bcrypt.hashSync(password,salt)
       await User.create({
           name,
           email,
           password:hashpassword,
       })
       return res.render('register',{msg:"Account created do login"})
    }catch(e){
        console.log(e)
        return res.render('register',{err:"something went wrong while creating account"})
    }
    
}

const login_get=async(req,res)=>{
    if(req.session.cookie.user){
        return res.redirect('/dashboard')
    }
    return res.render('login')
}

const login_post=async(req,res)=>{
    const {email,password}=req.body;
    let user=await User.findOne({where:{email}});
    if(!user){
        return res.render('login',{err:'account not found !'})
    }
    let hashpassword=user.password;
    if(bcrypt.compareSync(password,hashpassword)){
        req.session.user = user;
        return res.redirect('/dashboard')
    }
    return res.render('login',{err:'incorrect username or password'})
}

module.exports={
    login_get,
    login_post,
    register_get,
    register_post
}