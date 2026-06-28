//定制请求的实例

//导入axios  npm install axios
import axios from 'axios';
import { ElNotification } from 'element-plus';
//定义一个变量,记录公共的前缀  ,  baseURL
const baseURL = '/api';
const instance = axios.create({baseURL})

import { useTokenStore } from '@/stores/token.js';
//添加请求拦截器
instance.interceptors.request.use(
    (config)=>{
        //请求前的回调
        //添加token
        const tokenStore=useTokenStore();
        //判断有没有token
        if(tokenStore.token){
            config.headers.token=tokenStore.token
        }
        return config;
    },
    (err)=>{
        //请求错误回调
        Promise.reject(err)
    }
)
import router from '@/router';
//添加响应拦截器
instance.interceptors.response.use(
    result=>{
        //判断业务状态码
        if(result.data.code===200){
            return result.data;
        }
        ElNotification({
            message: result.data.errorMessage,
            type: 'Error',
            position: 'top-left',
        })
        return Promise.reject(result.data)
    },
    err=>{
        //判断响应状态码，如果为401，则证明未登录
        if(err.response.status===401){
            ElNotification({
            message: "请先登录",
            type: 'Error',
            position: 'top-left',
        })
            router.push('/QQMusicView');
            return new Promise(() => {});
        }else{
            ElNotification({
            message: "服务异常",
            type: 'Error',
            position: 'top-left',
        })
        }
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)

export default instance; 