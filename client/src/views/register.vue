<template>
    <div class="register">
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
    export default {
        name: "register",

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
                    password2:''
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
                }
            }

        },
        methods:{
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //注册
                        this.$axios.post('/api/user/register',this.registerUser)
                            .then(res=>{
                                //注册成功
                                this.$message({
                                    type:'success',
                                    message:'注册成功'
                                })
                                this.$router.push("/login")
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
