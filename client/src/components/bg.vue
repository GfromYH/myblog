<template>
    <div id="imgs">
        <div class="bg">
            <transition
                    :css="false"
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @leave="leave"
            >
                <img :src="showImg" alt="" v-if="show" >
            </transition>
        </div>
        <div class="screen"></div>
    </div>
</template>

<script>
    export default {
        name: "bg",
        data(){
            return{
                imgs:[],
                showImgIndex:0,
                show:true,
                showImg:"static/bg/0.jpg"

            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.show=false
                this.getImgs()
            })
        },
        methods:{
            getImgs(){
                this.$axios.get('static/data/bg.json')
                    .then(res=>{
                        // console.log(res.data)
                        this.imgs=res.data
                    })
            },
            beforeEnter(el){
                el.style.opacity=0;
                el.style.transform="scale(1.1)"
            },
            enter(el,done){
                let vm=this
                Velocity(el,{
                    opacity:1,
                    scale: 1
                },{
                    duration:6000,
                    complete(){
                        done()
                        vm.show=false
                    }
                })
            },
            leave(el,done){
                let vm=this
                Velocity(el,{
                    opacity:0,
                    scale:1.2
                },{
                    duration:6000,
                    complete(){
                        done()
                        vm.showImg=vm.imgs[vm.showImgIndex===5?vm.showImgIndex=0:vm.showImgIndex+=1].imgURL
                        vm.show=true
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .bg{
        position: fixed;
        left: 0;
        top:0;
        /*background-color: rgb(180, 180, 180);*/
        height: 100%;
        width: 100%;
        min-width: 1000px;
        z-index: 20;
        background-position: center 0;
        background-repeat: no-repeat;
        background-size: cover;
        -webkit-background-size: cover;
        -o-background-size: cover;
        zoom: 1;
    }
    img{
        display: inline-block;
        position: relative;
        width: 100%;
        height: 100%;
        vertical-align: middle;
        z-index:30;
    }
    .screen{
        width: 100%;
        height: 100%;
        background-color: #444;
        z-index: 32;
        opacity: 0.3;
        filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=10);
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
