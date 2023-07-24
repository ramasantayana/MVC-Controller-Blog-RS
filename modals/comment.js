const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const User=require('./users')
const Blog=require('./blog')

const Comment = sequelize.define('comment', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    content: { type: Sequelize.TEXT, allowNull:false },
    blog_ref: { 
        type: Sequelize.INTEGER, 
        references: {
            model:'blogs',
            key:'id'
         },
         },
    comment_by:{ 
        type: Sequelize.INTEGER, 
        references: {
            model:'users',
            key:'id'
         },
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
})

Blog.hasMany(Comment);
User.hasMany(Comment);
Comment.belongsTo(User,{foreignKey:'comment_by'})
Comment.belongsTo(Blog,{foreignKey:'blog_ref'})
module.exports = Comment;