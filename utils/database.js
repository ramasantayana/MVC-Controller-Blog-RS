const mysql2=require('mysql2');
const Sequelize =require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize('blog', 'root', process.env.DB_PASS, {
    host:'localhost',
    dialect: 'mysql',
    dialectModule:mysql2
  })

module.exports=sequelize;