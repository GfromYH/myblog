<template>
    <div class="register">
        <bg></bg>
        <section class="form_container">
            <div class="manage_title">
                <span class="title">个人博客</span>
            </div>
            <el-form :model="registerUser"  :rules="rules" ref="registerForm" label-width="80px" class="registerForm">
                <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model="registerUser.username" ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="registerUser.password" ></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password2">
                    <el-input type="password" v-model="registerUser.password2" ></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="capthe">
                    <el-row>
                        <el-col :span="12">
                            <el-input type="text" placeholder="验证码" id="capthe1" v-model="registerUser.capthe" ref="capthe"></el-input>
                        </el-col>
                        <el-col :span="12">
                            <span id="canvas" v-if="verifyCode.options" @click="verifyCode.refresh()">{{verifyCode.options.code}}</span>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('registerForm')" class="btn">注册</el-button>
                </el-form-item>
                <div class="tiparea">
                    <p>返回<router-link to='/login'>登录</router-link></p>
                </div>
            </el-form>
        </section>
    </div>
</template>

<script>
    import bg from '../components/bg'
    import GVerify from '../getGverify'

    export default {
        name: "register",
        mounted(){
            this.$nextTick(()=>{
                this.verifyCode = new GVerify('capthe1')
            })
        },
        data(){
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerUser.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                registerUser:{
                    username:'',
                    password:'',
                    password2:'',
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
                    password2:[
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                },
                verifyCode:{

                }
            }

        },
        components:{
            bg
        },
        methods:{
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //注册
                        // console.log(this.verifyCode.validate(this.loginUser.capthe))
                        if (this.verifyCode.validate(this.registerUser.capthe)){
                            return this.$axios.post('/api/user/register',this.registerUser)
                                .then(res => {
                                    //注册成功
                                    this.$message({
                                        type: 'success',
                                        message: '注册成功'
                                    })
                                    const {token}=res.data
                                    //存储到localStorage
                                    localStorage.setItem("eleToken",token)
                                    this.$router.push('/login')
                                })
                        } else {
                            this.$message.error('验证码输入错误');
                            this.loginUser.capthe=''
                            return false;
                        }
                    }
                });
            }
        }
    }
</script>

<style scoped>
.register{
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
        opacity: .5;
        z-index: 999;
    }
.form_container:hover{
    opacity: 1;
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
.form_container .manage_title .title{
    font-family: "Microsoft YaHei";
    font-weight: bold;
    color: #fff;
    font-size: 1.5rem;
}
.registerForm{
    margin-top: 20px;
    background-color: #fff;
    border-radius: 5px;
    padding: 20px 40px 20px 20px;
    box-shadow: 0px 5px 10px #cccc;

}
.registerForm .btn{
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
