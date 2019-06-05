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
    return config
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
    return Promise.reject(error)
})


export default axios;
