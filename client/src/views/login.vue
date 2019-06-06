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
                <el-form-item>
                    <el-button type="primary" @click="submitForm('loginForm')" class="btn">登录</el-button>
                </el-form-item>
                <div class="tiparea">
                    <p>还没有账号？现在<router-link to='/register'>注册</router-link></p>
                </div>
            </el-form>
        </section>
    </div>
</template>

<script>
    import {set} from '../assets/js/getAndSetLocalStorage'
    export default {
        name: "login",
        data(){
            return{
                loginUser:{
                    username:'',
                    password:''
                },
                rules:{
                    username:[
                        {required:true,message:'用户名不能为空',trigger:'blur'},
                        { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
                    ],
                    password:[
                        {required:true,message:'密码不能为空',trigger:'blur'},
                        { min: 2, max: 15, message: "长度在 2 到 15 个字符", trigger: "blur" }
                    ]
                }
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //注册
                        this.$axios.post('/api/user/login', this.loginUser
                        )
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
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
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
