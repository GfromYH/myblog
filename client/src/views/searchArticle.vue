<template>
    <div class="search">
        <navbar></navbar>
        <section class="search-container">
            <div class="search-info">
                <div class="search-input">
                    <el-row>
                        <el-col :span="20">
                            <el-input
                                placeholder="请输入文章名称"
                                prefix-icon="el-icon-search"
                                v-model="searchInfo"
                                @click="search">
                            </el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-button  icon="el-icon-search" type="danger" style="width: 100%;text-align: center" @click="search">搜索</el-button>
                        </el-col>
                    </el-row>



                </div>
                <div class="search-content">
                    <el-row :gutter="20">
                    <transition-group apear name="move" >
                        <el-col :md="8" :xs="24" v-for="(articleList,index) in tableData" :key="index">
                            <a href="javascript:;" class="search-item" @click="goToTheArticle(articleList)">
                                <p>{{articleList.title}}</p>
                                <span>发布时间：{{articleList.date|dateForm}}</span>
                            </a>
                        </el-col>
                    </transition-group>
                    </el-row>
                </div>
            </div>
            <el-row>
                <el-col :span="24">
                    <div class="pagination">
                        <el-pagination
                                :page-sizes="paginations.page_sizes"
                                :page-size="paginations.page_size"
                                :layout="paginations.layout"
                                :total="paginations.total"
                                :current-page.sync='paginations.page_index'
                                @current-change='handleCurrentChange'
                                @size-change='handleSizeChange'>
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </section>
        <footerBar></footerBar>
    </div>

</template>

<script>
    import navbar from '../components/navbar'
    import footerBar from '../components/footer'
    export default {
        name: "searchArticle",
        created(){

         this.docKeydown()
        },
        data(){
            return{
                searchInfo:'',
                tableData: [],
                articleLists:[],
                paginations: {
                    page_index: 1, // 当前位于哪页
                    total: 0, // 总数
                    page_size: 9, // 1页显示多少条
                    page_sizes: [9, 18, 27, 36], //每页显示多少条
                    layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
                }
            }
        },
        components:{
            footerBar,navbar
        },
        methods: {
            search() {
                // console.log(this.searchInfo)
                this.$axios.get('/api/article/articleList')
                    .then(res => {
                        return this.articleLists = res.data
                    }).then(res=>this.setPaginations())
            },
            docKeydown() {
                document.onkeydown = (e) => {
                    let key = window.event.keyCode
                    if (key === 13) {
                        this.search()
                    }
                }
            },
            goToTheArticle(item){
                return this.$router.push('/lookArticleInfo/'+item._id)
            },
            //    分页
            //当前页面
            handleCurrentChange(page){
                let sortNum=this.paginations.page_size*(page-1)
                let table=this.filterArticleLists.filter((item,index)=>{
                    return index>=sortNum
                })
                //设置当前页的数据
                this.tableData=table.filter((item,index)=>{
                    return index<this.paginations.page_size
                })
                if (document.body.scrollTop) {
                    document.body.scrollTop = 0
                }else{
                    document.documentElement.scrollTop = 0
                }
            },
            handleSizeChange(page_size){
                //切换size
                this.paginations.page_index=1;
                this.paginations.page_size=page_size;
                this.tableData=this.filterArticleLists.filter((item,index)=>{
                    return index<page_size
                })
                if (document.body.scrollTop) {
                    document.body.scrollTop = 0
                }else{
                    document.documentElement.scrollTop = 0
                }
            },
            setPaginations(){
                //总页数
                this.paginations.total=this.filterArticleLists.length;
                this.paginations.page_index=1;
                this.paginations.page_size=9;
                // 设置默认分页数据
                this.tableData = this.filterArticleLists.filter((item, index) => {
                    return index < this.paginations.page_size;
                });
            }

        },
        computed:{
            filterArticleLists(){
                if (this.searchInfo.trim().length === 0) {
                    return this.articleLists
                }else{
                    return this.articleLists.filter(item=>{
                       return item.title.toLowerCase().includes(this.searchInfo.toLowerCase())
                    })
                }
            }
        },
        filters:{
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

<style scoped>
.search-container{
    width: 100%;
    height: 100%;
    position: relative;

}
.search-info{
    width: 940px;
    margin: 0 auto;
    padding: 20px 10px;
}
@media (max-width: 940px) {
    .search-info{
        width: 100%;
        padding: 20px 0;
    }
    .search-input{
        width: 100%;
    }
}
    .search-content{
        min-height: 250px;
        padding: 28px 10px;
    }
.el-col {
    margin-bottom: 20px;

}
.el-col:last-child{
     margin-bottom: 0;
}
    .search-item{
        display: inline-block;
        box-sizing: border-box;
        position: relative;
        text-decoration: none;
        width: 100%;
        height: 150px;
        padding: 10px 10px;

        border-radius: 10px;

        background-color: #6969f9;
    }
.search-item:hover{
    background-color: #6A6AFF;
}
.search-item  p{
    display: block;
    color: #fff;
    font-size: 2rem;
    font-weight: bold;
    width: 100%;
    height: 70%;
}
.search-item span{
    color: #fff;
    font-size: 1rem;
    display: block;

    border-top: 3px solid #fff;
    box-sizing: border-box;
    padding: 15px 0;
}
/*分页*/
.pagination{
    padding: 20px 20px;
    margin: 0 auto;
    text-align: center;
}
.move-enter,
.move-leave-to{
    opacity: 0;
}
.move-enter-active,
.move-leave-active{
    transition: all .5s ease-in-out ;
}
</style>
