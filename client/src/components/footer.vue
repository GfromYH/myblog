<template>
    <footer class="footerbar">
        <div class="footerbar-social">
            <div class="footerbar-container">
                <div class="social-list">
                    <a href="javascript:;">Ending</a>
                </div>
            </div>
        </div>
        <div class="footerbar-meta">
            <div class="footerbar-container">
                <div class="meta-item meta-copyright">
                    <div class="meta-copyright-info">
                        <a href="#" class="info-logo">
                            GG的小屋
                        </a>
                        <div class="info-text">
                            <p>Powered by <a href="http://www.typecho.org" target="_blank" rel="nofollow">Typecho</a></p>
                            <p>© 2019 <a href="javascript:;">GG的小屋</a></p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "footerbar"
    }
</script>

<style scoped>
    .footerbar{
        margin-top: 0;
        position: relative;
        z-index: 1;
        padding-bottom: 50px;
        background-color: #F2F3EF;
        box-sizing: border-box;
    }
    .footerbar-social{
        border-bottom: 1px solid rgba(184,197,214,.2);
    }
    .footerbar-container{
        width: 940px;
        margin: 0 auto;
    }

    .social-list{
        width: 100%;
        padding:20px 0;
        text-align: center;
    }
    .social-list a{
        text-decoration: none;
        display: inline-block;
        padding: 0 10px;
        color: #5f5f5f;
    }
    .footerbar-meta .footerbar-container{
        margin: 0 auto;
        text-align: center;
        width: 100%;
        max-width: 960px;
        height: 150px;

    }

    .footerbar-meta .footerbar-container .meta-item{
        position: relative;
        float: left;
        width: 100%;
        min-height: 1px;
        padding: 20px 0;
        line-height: 1.8;
        text-align: center;
    }
    .footerbar-meta .footerbar-container .meta-item a{
        text-decoration: none;
        color: #5f5f5f;
    }
    .info-logo{
        font-size: 14px;
    }
    .info-text{
        font-size: 13px;

    }
    .info-text p{
        line-height: 1.8;
        color: #5f5f5f;
    }
    @media (max-width: 760px){
        .social-list{
            padding: 20px 0;
        }
        .footerbar-container{
            width: 100%;
        }
        .footerbar-meta .footerbar-container .meta-item{
            padding: 20px 2px;
        }
        .footerbar-meta .footerbar-container{
            width: 100%;
            padding: 0;
        }

    }
</style>
