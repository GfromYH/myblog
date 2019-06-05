import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index'
import register from './views/register'
import login from './views/login'
import showArticleInfo from './views/showArticleInfo'
import lookArticleInfo from './views/lookArticleInfo'
import editArticleInfo from './views/editArticleInfo'
import {get} from './assets/js/getAndSetLocalStorage'
import notFound from './views/notFound'

Vue.use(Router)

const router= new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect:'/index'
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/showArticleInfo/:id',
      name: 'showArticleInfo',
      component: showArticleInfo
    },
    {
      path: '/lookArticleInfo/:id',
      name: 'lookArticleInfo',
      component: lookArticleInfo
    },
    {
      path: '/editArticleInfo/:id',
      name: 'editArticleInfo',
      component: editArticleInfo
    },
    {
      path: '/editArticleInfo',
      name: 'editArticleInfo',
      component: editArticleInfo
    },
    {
      path: '*',
      name: 'notFound',
      component: notFound
    }
  ]
})
// 添加路由守卫
// router.beforeEach((to, from, next) => {
//   const isLogin = get('user',6) ? true : false;
//   if (to.path == "/login" || to.path == "/register") {
//     next();
//   } else {
//     isLogin ? next() : next("/login");
//   }
// })

export default router;
