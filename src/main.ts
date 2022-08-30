import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/index'
import store from './store'
// import require from './axios'
import 'easymde/dist/easymde.min.css'
const app = createApp(App)
// 注册全局属性
// app.config.globalProperties.$http = require
// 注册router
app.use(router)
// 注册vuex
app.use(store)
app.mount('#app')
