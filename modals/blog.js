const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const User=require('./users')
const Blog = sequelize.define('blog', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    title: { type: Sequelize.STRING, allowNull:false },
    content: { type: Sequelize.TEXT, allowNull:false },
    author: { 
        type: Sequelize.INTEGER, 
        references: {
            model:'users',
            key:'id'
         },
         },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
})

User.hasMany(Blog);
Blog.belongsTo(User,{foreignKey:'author'})
module.exports = Blog