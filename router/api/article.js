const express=require('express')
const Article=require('../../model/Article')
const passport=require('passport')


// 配置路由容器
const router=express.Router()
router.get('/test',(req,res)=>{
    res.send('success')
})
//获取所有的文章页面
router.get('/articleList',passport.authenticate("jwt",{session:false}),(req,res)=>{
    Article.find()
        .then(article=>{
            res.json(article)
        })
        .catch(err=>{
            res.send(err+'读取失败')
        })
})

//文章保存
router.post('/newArticle',passport.authenticate("jwt",{session:false}),(req,res)=>{
     new Article({
         title:req.body.title,
         content:req.body.content,
         gist:req.body.gist,
         labels:req.body.labels
     }).save()
         .then(article=>{
             res.send(article)
         })
         .catch(err=>{
             console.log(err)
         })
})

//单个文章
router.get('/articleDetail/:id',passport.authenticate("jwt",{session:false}),(req,res)=>{
    Article.findOne({
        _id:req.params.id
    })
        .then(article=>{
            // console.log(article.title)
            // console.log(article.date.toString())
            res.send(article)
        })
        .catch(err=>{
            res.send(err)
        })
})

//编辑单个文章
router.post('/updateArticle/:id',passport.authenticate("jwt",{session:false}),(req,res)=>{
        let articleFields={}
        if(req.body.title){articleFields.title=req.body.title}
        if(req.body.gist){articleFields.gist=req.body.gist}
        if(req.body.content){articleFields.content=req.body.content}
        if(req.body.labels){articleFields.labels=req.body.labels}
        if(req.body.date){articleFields.date=req.body.date}

        Article.findOneAndUpdate({_id:req.params.id},{$set:articleFields},{new:true}).then(article=>{
            res.send(article)
        })
})
// 文章删除
router.delete('/deleteArticle/:id',passport.authenticate("jwt",{session:false}), function (req, res) {
    Article.findOneAndRemove({_id: req.params.id})
        .then(article=>{
            res.send(article)
        })
        .catch(err=>res.send(err))
})
module.exports=router
