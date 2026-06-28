import { createApp } from 'vue'//createApp 函数用于创建一个新的 Vue 应用实例
import App from './App.vue'//它是整个应用的入口

import router from './router'//引入路由插件

import ElementPlus from 'element-plus'//ElementPlus 组件库的核心对象
import 'element-plus/dist/index.css'//引入 ElementPlus 的 CSS 样式文件

import { createPinia } from 'pinia'//令牌携带
import { createPersistedState } from 'pinia-persistedstate-plugin'
const app=createApp(App);//Vue 应用添加额外的功能
const pinia=createPinia();
const persist=createPersistedState();
pinia.use(persist)
app.use(pinia)
app.use(ElementPlus)//在项目的各个组件里就能够使用 ElementPlus 提供的各种组件了
app.use(router);//使用路由插件
app.mount('#app')//把 Vue 应用挂载到 HTML 页面里的某个 DOM 节点上
