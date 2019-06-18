<template>
    <div class="editInfo">
        <navbar></navbar>
        <div class="editAbove">
            <scrolltop></scrolltop>
            <div class="edit_wrap">
                <div class="return_button">
                    <el-button icon="arrow-left" size="small" @click="$router.go(-1)" type="primary" style="color: #fff;">返回</el-button>
                </div>
                <div class="edit_head">标题</div>
                <el-input v-model="title" placeholder="请输入标题"></el-input>
                <div class="tag_wrap">
                    <span>标签: </span>
                    <el-tag
                            class="tag_margin"
                            :key="tag"
                            v-for="tag in labels"
                            :closable="true"
                            :close-trasition="true"
                            @close="handleClose(tag)"
                            type="primary"
                    >{{ tag }}
                    </el-tag>
                    <el-input
                            class="input-new-tag"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="mini"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                </div>
                <div class="edit_head">简介</div>
                <el-input
                        type="textarea"
                        :rows="5"
                        placeholder="请输入简介"
                        v-model="gist"
                        resize="none">
                </el-input>
                <div class="edit_head">内容 (Markdown编辑器)</div>
                <div class="markdown">
                    <textarea class="markdown_input" v-model="content" @input="update"></textarea>
                    <div class="markdown_compiled" v-html="compiledMarkdown()"></div>
                    <div class="clear"></div>
                </div>
                <div class="save_button">
                    <el-button type="primary" @click="saveArticle">保存</el-button>
                </div>
            </div>
        </div>
        <footerBar></footerBar>
    </div>
</template>

<script>
    import navbar from '../components/navbar'
    import footerBar from '../components/footer'
    import scrolltop from  '../components/scrolltop'

    import _ from 'lodash'
    import marked from 'marked'
    import hightlight from 'highlight.js'
    import '../assets/css/light.css'
    marked.setOptions({
        hightlight: function (code) {
            return hightlight.hightlightAuto(code).value
        }
    })

    export default {

        name: "editArticleInfo",
        mounted() {
            this.getArticleInfo()
        },
        data(){
            return{
                title: '',
                date: '',
                content: '',
                gist: '',
                labels: [],
                inputVisible: false,
                inputValue: '',
                id:''
            }
        },
        methods:{
            getArticleInfo(){
                if (this.$route.params.id) {
                    this.id = this.$route.params.id
                    this.$axios.get(`/api/article/articleDetail/${this.id}`)
                        .then(res => {
                            // console.log(res)
                            let obj = res.data
                            this.title = obj.title;
                            this.date = Date.now();
                            this.gist = obj.gist;
                            this.content = obj.content;
                            this.labels = obj.labels;
                            return obj
                        })
                }
            },
            saveArticle(){
                if (this.title.trim().length === 0) {
                    this.$notify({
                        title: '偏移',
                        message: '文章题目不能为空',
                        offset: 100
                    });
                    return;
                }
                if (this.content.length === 0) {
                    this.$notify({
                        title: '提醒',
                        message: '请输入内容',
                        type: 'warning'
                    })
                    return;
                }
                if (this.gist.length === 0) {
                    this.$notify({
                        title: '提醒',
                        message: '请输入简介',
                        type: 'warning'
                    });
                    return;
                }
                if (this.$route.params.id) {
                    //更新文章
                    let obj = {
                        _id: this.$route.params.id,
                        title: this.title,
                        date: this.date,
                        content: this.content,
                        gist: this.gist,
                        labels: this.labels
                    }
                    this.$axios.post(`/api/article/updateArticle/${this.$route.params.id}`,obj)
                        .then(res=>{
                            this.$message({
                                message: '更新文章成功',
                                type: 'success'
                            })
                            // 更新完成后跳转至该文章的初始
                           return this.$router.push('/lookArticleInfo/' + this.$route.params.id)
                        })
                }else{
                    //新建文章
                    let obj = {
                        title: this.title,
                        date: this.date,
                        content: this.content,
                        gist: this.gist,
                        labels: this.labels
                    }
                    this.$axios.post('/api/article/newArticle',obj)
                        .then(res=>{
                            this.$message({
                                message: '又增加了一篇博客哟！~~',
                                type: 'success'
                            })
                          return  this.$router.push('/index')

                        })

                }
            },

            compiledMarkdown: function () {
                return marked(this.content, {sanitize: true})
            },
            update(){
                _.debounce( (e) =>{
                    this.content = e.target.value
                }, 300)
            },
            //element tag组件
            handleClose: function (tag) {
                this.labels.splice(this.labels.indexOf(tag), 1)
            },
            showInput: function () {
                this.inputVisible = true
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus()
                })
            },
            handleInputConfirm: function () {
                let inputValue = this.inputValue
                if (inputValue) this.labels.push(inputValue)
                this.inputVisible = false
                this.inputValue = ''
            }
        },
        computed:{

        },
        components:{
            navbar,
            footerBar,
            scrolltop
        },
    }
</script>

<style scoped>
.editAbove{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
.edit_wrap{
    width: 940px;
    margin: 0 auto;
    padding: 20px 30px;
    margin-top: 10px;
    font-size: 16px;
}
.return_button{
    padding: 20px 0;
}
.edit_head{
    padding: 20px 0;
}
.tag_wrap{
    padding: 30px  0;
}
.tag_wrap span{
    display: inline-block;
    padding: 0 10px;
    text-align: center;
    vertical-align: middle;
}
.tag_wrap span:nth-child(1){
    padding: 10px 10px;
}
.markdown_input{
    float: left;
    display: inline-block;
    resize: none;
    width: 49%;
    min-height: 250px ;
}
.clear{
    clear: both;
}
.tag_margin{
    display: inline-block;
    text-align: center;

}
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
.save_button{
    margin: 20px 0;
}

.markdown_compiled {

    float: right;
    display: inline-block;
    width: 49%;
    min-height: 250px;
    overflow: auto;
    background-color: #fcfcfc;
    padding: 5px 0 5px 1%;
}

@media (max-width: 460px) {
    .edit_wrap{
        width: 100%;
        padding: 20px 10px;
    }
    .markdown_input{
        width: 45%;
    }
    .save_button{
        position: relative;
        left: 38%;
    }
}

</style>
