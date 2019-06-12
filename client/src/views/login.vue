<template>
    <div class="login">
        <section class="form_container">
            <div class="manage_title">
                <span class="title">个人博客</span>
            </div>
            <el-form :model="loginUser" :rules="rules"  ref="loginForm" label-width="80px" class="loginForm">
                <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model="loginUser.username" ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginUser.password" ></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="capthe">
                    <el-row>
                        <el-col :span="12">
                            <el-input type="text" placeholder="验证码" id="capthe1" v-model="loginUser.capthe" ref="capthe"></el-input>
                        </el-col>
                        <el-col :span="12" class="capyhe">
                            <span id="canvas" v-if="verifyCode.options" @click="verifyCode.refresh()" ref="canvas">{{verifyCode.options.code}}</span>
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')" class="btn">登录</el-button>
                </el-form-item>
                <div class="tiparea">
                    <p>还没有账号？现在<router-link to='/register'>注册</router-link></p>
                </div>
            </el-form>
        </section>
        <bg></bg>
    </div>
</template>

<script>
    import {set} from '../assets/js/getAndSetLocalStorage'
    import bg from '../components/bg'
    import GVerify from '../getGverify'
    export default {
        name: "login",
        mounted(){
            this.$nextTick(()=>{
                this.verifyCode = new GVerify('capthe1')
                // this.verifyCode._init()
                // console.log(this.verifyCode.refresh)
            })
        },
        data(){
            return{
                loginUser:{
                    username:'',
                    password:'',
                    capthe:''
                },
                rules:{
                    username:[
                        {required:true,message:'用户名不能为空',trigger:'blur'},
                        { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
                    ],
                    password:[
                        {required:true,message:'密码不能为空',trigger:'blur'},
                        { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
                    ],
                    capthe:[
                        {required:true,message:'验证码不能为空',trigger:'blur'},
                        { min: 2, max: 15, message: "长度在 2 到 5 个字符", trigger: "blur" }
                    ]
                },
                verifyCode:{}
            }
        },
        components:{
            bg
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //注册
                        // console.log(this.verifyCode.validate(this.loginUser.capthe))
                        if (this.verifyCode.validate(this.loginUser.capthe)){
                            return this.$axios.post('/api/user/login',this.loginUser)
                                .then(res => {
                                    //注册成功
                                    this.$message({
                                        type: 'success',
                                        message: '登陆成功'
                                    })
                                    const {token}=res.data
                                    //存储到localStorage
                                    localStorage.setItem("eleToken",token)
                                    this.$router.push('/index')
                                })
                        } else {
                            this.$message.error('验证码输入错误');
                            this.verifyCode.refresh()
                            this.loginUser.capthe=''
                            return false;
                        }
                    }
                });

            },
            //想将初始化的验证码拆分一个一个的span调整样式实现字头i颜色彩虹话
            // init(){
            //     let code = this.verifyCode.options.code
            //     const capyhe=document.querySelector(".capyhe")
            //     // canvas.innerHTML=[...code].map((letters)=>`<span>${letters}</span>`).join('')
            //     capyhe.innerHTML=[...code].map((letters)=>`<span>${letters}</span>`).join('')
            //     const spans=document.querySelectorAll(".capyhe span")
            //     spans[0].style.display="inline-block"
            //     spans[0].style.padding="10px 10px"
            //     spans[0].style.color='red'
            //     console.log(typeof spans.item(0).style)
            //
            // }
        }
    }
</script>

<style scoped>
    .login{
        position: relative;
        width: 100%;
        height: 100%;
        font-size: 16px;
        background-color: #333;
    }
    .form_container{
        width: 370px;
        height: 210px;
        position: absolute;
        left: 50%;
        top: 20%;
        transform:translateX(-50%);
        padding: 25px;
        text-align: center;
        border-radius: 5px;
        z-index: 999;
        opacity: .5;
    }
    #canvas{
        display: inline-block;
        width: 100%;
        min-height: 40px;
        background-color: #c8c8c8;
        box-sizing: border-box;
        margin-left: 5px;
        border-radius: 10px;
        letter-spacing: 10px;
        cursor: pointer;
    }
    .form_container:hover{
        opacity: 1;
    }
    .form_container .manage_title .title{
        font-family: "Microsoft YaHei";
        font-weight: bold;
        color: #fff;
        font-size: 1.5rem;
    }
    .loginForm{
        margin-top: 20px;
        background-color: #fff;
        border-radius: 5px;
        padding: 20px 40px 20px 20px;
        box-shadow: 0px 5px 10px #cccc;

    }
    .loginForm .btn{
        width: 100%;
    }
    .tiparea{
        font-size: 0.8rem;
        text-align: right;
        color: #333;
    }
    .tiparea p a{
        padding: 0 5px;
        color: #6464cc;
    }
    .tiparea p a:hover{
        color: #0DB6CC;
    }


</style>
