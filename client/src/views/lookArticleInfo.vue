<template>
    <div class="lookArticle">
        <navbar></navbar>

        <div class="article_wrap">
                <div class="article_title article_detail_title">{{article.title}}</div>
                <div class="article_info">
                    <span class="article_info_date">发表于：{{article.date | dateForm}}</span>
                    <span class="article_info_label">标签：
                        <span v-if="!article.labels.length">未分类</span>
                        <el-tag v-else class="tag_margin" type="primary" v-for="(label,index) in article.labels" :key="index" >{{label}}</el-tag>
                    </span>
                </div>
                <div class="article_detail_content" >
                    <div class="article_detail_content_info" v-html="compiledMarkdown()"></div>
                </div>
                <div class="btn-froup">
                    <el-button type="primary" icon="el-icon-back" class="btn" circle size="small" title="返回" @click="editInfo"></el-button>
                </div>
            </div>

        <footerBar></footerBar>
    </div>
</template>

<script>
    import navbar from '../components/navbar'
    import footerBar from '../components/footer'
    import marked from 'marked'
    import highlight from 'highlight.js'

    marked.setOptions({
        highlight: function (code) {
            return highlight.highlightAuto(code).value
        }
    })
    export default {
        name: "lookArticleInfo",
        mounted(){
            this.getArticle()
        },
        data(){
          return{
              article:{},
              id:''
          }
        },
        methods:{
          getArticle(){
              this.id=this.$route.params.id;
              this.$axios.get(`/api/article/articleDetail/${this.id}`)
                  .then(res=>{
                     this.article=res.data
                      console.log(typeof this.article)
                      return
                  })
                  .catch(err=>console.log(err))
          },
          compiledMarkdown() {
              return marked(this.article.content || '', {sanitize: true})
            },
            editInfo(){
              return this.$router.go(-1)
            }
        },
        components:{
            navbar,
            footerBar
        },
        filters:{
            dateForm(time){
                let dateTime=JSON.parse(time);
                let date = new Date(dateTime);

                let year = date.getFullYear(),
                    month = date.getMonth() + 1,//月份是从0开始的
                    day = date.getDate(),
                    hour = date.getHours(),
                    min = date.getMinutes(),
                    sec = date.getSeconds();
                hour=String.prototype.padStart.call(hour,2,'0')
                min=String.prototype.padStart.call(min,2,'0')
                sec=String.prototype.padStart.call(sec,2,'0')

                let timeNew = year + '-' +
                    month + '-' +
                    day + ' ' +
                    hour + ':' +
                    min + ':' +
                    sec;
                return timeNew;
            }
        }
    }
</script>

<style scoped>
    @import '../assets/css/light.css'
    .article_wrap{
        width: 940px;
        padding: 10px 20px;
        margin: 0 auto;
    }
    .article_info{
        width: 100%;
        padding: 20px 10px;
        text-align: center;
        box-shadow: 0 1px 0px rgba(0,0,0,.1);

    }
    .article_detail_title {
        font-size: 25px;
        font-weight: bold;
        cursor: default;
        margin: 40px 0 0;
        text-align: center;
    }
    .article_info_date{
        display: inline-block;
        padding: 10px 20px;
    }
    .article_detail_content {
        width: 100%;
        height: 100%;

    }
    .article_detail_content_info{
        margin: 0 auto;
        font-size: 18px;
        text-indent: 2em;
        padding: 20px 20px;
        width: 940px;
        min-height: 300px;
    }
    .btn-froup{
        width: 100%;
        position: relative;
        height: 50px;
        overflow: hidden;
    }
    .btn-froup .btn{
        /*margin: 0 auto;*/
        display: block;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
</style>
