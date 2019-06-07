<template>
    <transition name="el-fade-in">
        <div class="backtop" @click="scrollToTop" v-show="toTopShow" ref="scrollBar">
            <i class="el-icon-caret-top"></i>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "scrolltop",
        data(){
            return{
                toTopShow:false,
                scrollTop:0
            }
        },
        methods:{
            handleScroll(){
               this.scrollTop=this.scrollTop=window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop
              this.toTopShow = this.scrollTop > 200;
            },
            scrollToTop(){
                // this.toTopShow=true
                // console.log(this.$refs.scrollBar.scrollTop);
                let timer=null,
                    _that=this;
                cancelAnimationFrame(timer)
                timer=requestAnimationFrame(function fn() {
                    if (_that.scrollTop > 50) {
                        _that.scrollTop-=50
                        document.body.scrollTop=document.documentElement.scrollTop=_that.scrollTop
                        requestAnimationFrame(fn)
                    }else{
                        cancelAnimationFrame(timer)
                            _that.toTopShow=false
                    }
                })
            }
        },
        mounted() {
            this.$nextTick(()=>{
                window.addEventListener("scroll",this.handleScroll)
            })
        },
        destroyed() {
            window.removeEventListener("scroll",this.handleScroll)
        }
    }
</script>

<style scoped>
    .backtop{
        position: fixed;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #fff;
        transition: .3s;
        color: #409eff;
        right: 40px;
        bottom: 40px;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 6px rgba(0,0,0,.12);
        z-index: 22;
        cursor: pointer;
    }
    .backtop:hover{
        background-color: #f3f3f3;
    }
</style>
