<template>
    <header class="navbar">
        <div class="container">
            <a class="nabar_title" href="javascript:;">
                GG的小屋
            </a>
            <div class="menu">
                <a href="javascript:;" @click="$router.push('/index')">Web</a>
                <a href="javascript:;">关于GG</a>
            </div>
            <a href="javascript:;" class="navbar_search" @click="$router.push('/searchArticle')">
                <i class="el-icon-search"></i>
            </a>

        </div>
    </header>

</template>

<script>
    export default {
        name: "navbar"
    }
</script>

<style scoped>
    .navbar{
        width: 100%;
        background-color: #F2F3EF;
        box-shadow: 0 1px 5px rgba(0,0,0,.1);
    }
    .container{
        position: relative;
        width: 1040px;
        max-width: 100%;
        height: 70px;
        overflow: hidden;
        margin: 0 auto;


    }
    @media (max-width: 760px){
        .container{
            width: 100%;
        }
    }
    .navbar .nabar_title{
        font-size: 21px;
        color: #333;
        display: block;
        text-decoration: none;
        position: absolute;
        top: 50%;
        width: auto;
        left: 0;
        margin-top: -12px;
        margin-left: 20px;
    }

    .menu{
        display: inline-block;
        width: auto;
        position: absolute;
        right: 30px;
        padding-right: 10px;
    }
    .menu a{

        font-size: 14px;
        text-decoration: none;
        display: inline-block;
        padding: 27px 10px;
        color: #333;

    }
    .navbar_search{
        color: #333;
        display: inline-block;
        position: absolute;
        font-size: 14px;
        line-height: 70px;
        width: 20px;
        right: 0;
        padding: 0 20px 0 0;

    }

</style>
