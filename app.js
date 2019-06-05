const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')

const app=express()

//迎入user路由模块
let user=require('./router/api/user')
//article
let article=require('./router/api/article')

//connect mongodb
mongoose.connect('mongodb://localhost:27017/blog',{useNewUrlParser:true})
//配置body-parser中间件处理post请求
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/api/user',user)
app.use('/api/article',article)

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log('running on port 3000')
})
