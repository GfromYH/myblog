import axios from 'axios'
import { Message, Loading } from 'element-ui';
import router from './router'

let loading
function startLoading(){
  loading= Loading.service({
      lock: true,
      text: '拼命加载中...',
      background: 'rgba(0, 0, 0, 0.7)'
  });
}
function endoLoading(){
    loading.close()
}
//拦截器
axios.interceptors.request.use(config=>{
    startLoading()
    if (localStorage.eleToken) {
        //设置统一的请求头
        config.headers.Authorization=localStorage.eleToken
    }
    return config;
},function (error) {
    return Promise.reject(error)
})

// 响应器

axios.interceptors.response.use(res=>{
    endoLoading()
    return res
},function (error) {
    endoLoading()
    Message.error(error.response.data)
    //获取错误状态吗
    const {status} =error.response
    if (status === 401) {
        Message.error("token已失效，请重新登录")
        //清除token
        localStorage.removeItem("eleToken")
        //跳转到登陆页面
        router.push('/login')
    }
    return Promise.reject(error)
})


export default axios;
