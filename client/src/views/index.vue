<template>
<div>
    <navbar></navbar>
    <section id="content" class="" >
        <div class="addArticle">
            <el-button href="javascript:;" icon="el-icon-plus" class="btn" @click="addArticle">新建文章哟！</el-button>
        </div>
        <div class="content_lists ">
            <div class="lists_item" v-for="(articleList,index) in articleLists" :key="index">
                <div class="list_item_container">
                    <div class="item-thumb"></div>
                    <a class="item-desc" href="javascript:;" @click="lookShowInfo(articleList)">
                        <p>{{articleList.gist|gistformDate}}</p>
                    </a>
                    <div class="item-slant reserve-slant bg-change"></div>
                    <div class="item-slant"></div>
                    <div class="item-label">
                        <div class="item-title">
                            <a href="javascript:;">{{articleList.title}}</a>
                        </div>
                        <div class="item-meta clearfix">
                            <div class="item-meta-ico bg-ico-chat" >

                            </div>
                            <div class="article_info">
                                <span class="article_info_date">发表于：{{articleList.date |dateForm}}</span>
                                <span class="article_info_label">标签：
                                    <span v-if="!articleList.labels.length">未分类</span>
                                    <el-tag v-else class="tag_margin" type="primary" size="small" v-for="(label,index) in articleList.labels" :key="index" >{{label}}
                                    </el-tag>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="lists-btn">
                    <el-button type="success" icon="el-icon-view" circle size="small" title="查看" @click="lookShowInfo(articleList)"></el-button>
                    <el-button type="primary" icon="el-icon-edit" circle size="small" title="编辑" @click="editInfo(articleList)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle size="small" title="删除" @click="deleteInfo(articleList)"></el-button>
                </div>
            </div>

        </div>
    </section>
    <footerBar></footerBar>
</div>
</template>

<script>
    import navbar from '../components/navbar'
    import footerBar from '../components/footer'
    export default {
        name: "index",
        data(){
            return{
                articleLists:[]
            }
        },
        created(){
            this.getDatas()
        },
        methods: {
            getDatas() {
                this.$axios.get('/api/article/articleList')
                    .then(response => {
                        this.articleLists = response.data
                        // console.log(this.articleLists)
                        // console.log(typeof this.articleLists[0].date)
                    })
            },
            //新建文章
            addArticle() {
                return this.$router.push('/editArticleInfo')
            },
            //查看文章
            lookShowInfo(item) {
                // console.log(item)
                return this.$router.push({path: '/lookArticleInfo/' + item._id})
            },
            //编辑文章
            editInfo(item) {
                return this.$router.push({path: '/editArticleInfo/' + item._id})
            },
            //删除
            deleteInfo(item) {
                // console.log(item)
                        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                          return  this.$axios.delete(`/api/article/deleteArticle/${item._id}`)})
                                .then(res => {
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });}).then(res=>{
                                                return this.getDatas()
                                            })

                            .catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });
                        });

            }
        },
        components:{
            navbar,
            footerBar
        },
        filters:{
            gistformDate(value){
                return value.substr(0,30)+'...'
            },
            dateForm(time){
                let dateTime=JSON.parse(time)
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

<style scoped >


    /*======================================中间部分======================*/
    @keyframes item_desc {
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
    @keyframes item_thumb{
        0%{

        }
    }
#content::before{
    content: '';
    clear: both;
}
    #content{
        position: relative;
        max-width: 940px;
        margin: 0 auto;
        padding: 80px 20px 0;
        box-sizing: border-box;
    }
    .addArticle{
        position: relative;
        width: 100%;
        min-height: 60px;
        left: 0;
        top: 0;
    }
    .addArticle .btn{
        display: block;
        position: absolute;
        z-index: 3;
        padding: 10px 20px;
        color: #333;
        border: 0.2rem solid #333;
        border-radius: 5px;
        background-color: #F6F6F6;
        font-size: 15px;
        font-weight: bold;
        text-transform: uppercase;
        text-align: center;
        top: -32%;
        left: 50%;
        transform: translateX(-50%);
    }
    .addArticle .btn:hover{
        background-color: #282828;
        color: #f3f3f3;
        border: 0.2rem solid #282828;

    }
    .content_lists{
        position: relative;
        overflow: hidden;

    }
    .lists_item{
        float: left;
        width: 33.3333%;
        height: auto;
        padding: 15px;
        align-items: center;
        box-sizing: border-box;
        margin-bottom: 20px;
    }

    @media (max-width: 760px){
        .lists_item{
            width: 100%;
        }
    }
    .list_item_container{
        position: relative;
        width: 100%;
        border-radius: 5px;
        padding: 0;
        overflow: hidden;
        /*background-color: #000;*/

        -webkit-box-shadow: 0 1px 4px rgba(0,0,0,.04);
        -moz-box-shadow: 0 1px 4px rgba(0,0,0,.04);
        box-shadow: 0 1px 4px rgba(0,0,0,.04);
    }
    .item-thumb{
        min-height: 250px;
        background: url("../assets/1.jpg") no-repeat  center center/cover;
    }
    .list_item_container:hover .item-desc{
        animation: item_desc .5s ease-in-out alternate forwards;
        background-color: rgba(0,0,0,.5);
    }
    .list_item_container:hover .item-thumb{
        /*background: rgba(0,0,0,.1);*/
    }
    .item-desc{
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        padding: 40px 28px;
        box-sizing: border-box;
        opacity: 0;
    }
.item-desc p{
    font-size: 14px;
    margin: 0;
    padding: 0;
    word-break: break-all;
    line-height: 1.6;
    color: #fff;
}
    .item-slant{
        z-index: 1;
        position: absolute;
        min-height: 100px;
        width: 110%;
        left: 0;
        right: 0;
        bottom: 50px;
        transform: rotate(10deg) translate(-25px,-20px);
        background-color: #f9f9f9;
    }
    .reserve-slant{
        transform: rotate(-10deg) translate(10px,-27px);
        background-color: #f68e5f;
        opacity: .7;
    }
    .item-label{
        z-index: 2;
        position: relative;
        height: 130px;
        padding: 10px 20px 10px;
        background-color: #f9f9f9;
    }
.item-label .item-title a{
    font-size: 17px;
    line-height: 1.6;
    color: #333;
    word-break: break-all;
    text-decoration: none;
}
.item-label .item-meta{
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    text-align: right;
    padding: 0 15px 15px;
}
.item-label .item-meta .item-meta-ico{
    width: 42px;
    height: 42px;
    border: 1px solid #eaeaea;
    float: right;
    background: url("../assets/bg-ico.png") no-repeat;
    -webkit-background-size: 40px auto;
    background-size: 40px auto;
    border-radius: 50% ;
}
    .article_info{
        position: relative;
        padding: 10px 20px;
        height: 40px;

    }
    .article_info .article_info_date{
        text-align: left;
        font-size: 13px;
        display: block;
        position: absolute;
        left: 24%;
        top: -15px;

    }
    .article_info .article_info_label{
        position: absolute;
        font-size: 13px;
        left: 26px;
        top: 13px;
    }
    .article_info .article_info_label  .tag_margin {
        padding: 2px 5px;

    }
    /*====================尾部============================*/

</style>
