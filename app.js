const express=require('express');
const sequelize=require('./utils/database');
const { engine }= require('express-handlebars');
const mainRouter=require('./routes/index')
const bodyParser=require('body-parser');
var session = require('express-session')
const app=express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.use(express.static('public'))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
var sess = {
    secret: 'keyboard cat',
    cookie: {}
}
app.use(session(sess))
sequelize.sync()
.then(()=>{
    console.log('db sync')
})
.catch(err=>{
    console.log('db sync error',err)
})

app.use(mainRouter)


app.listen(3000,()=>{
    console.log('server started at 3000')
})