const express=require('express')
const User=require('../../model/User')

// 配置路由容器
const router=express.Router()
//注册
router.post('/register',(req,res)=>{
    User.findOne({
        username:req.body.username
    })
        .then((user)=>{
            if (user) {
                return  res.status(500).send('该用户名已存在')
            }
            new User({
                username:req.body.username,
                password:req.body.password,
            }).save()
                .then(user=>{
                    res.send(user)
                })
                .catch(err=>{
                    res.send(err)
                })
        })
})
//登录
router.post('/login',(req,res)=>{
    User.findOne({
        username:req.body.username

    })
        .then((user)=>{
            if (!user) {
               return res.status(500).json('用户不存在')
            }
            else if (user.password !== req.body.password) {
                return res.status(500).json('密码错误')
            }else{
                return res.json('登陆成功')
            }
        })
})
// 根据当前用户获取信息
router.get('/getUser/:username',(req,res)=>{
    User.findOne({
        username:req.params.username

    })
        .then((user)=>{
           res.json(user)
        })
        .catch(err=>{
            res.send(err)
        })
})

module.exports=router
