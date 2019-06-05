const mongoose = require('mongoose')



const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    date:{
        type:String,
        default:Date.now()
    },
    content:{
        type:String,
        required:true
    },
    gist:{
        type:String,
        required:true
    },
    labels:{
        type:Array,
        required:true
    }
})



module.exports =mongoose.model('Article', articleSchema)
