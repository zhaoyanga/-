// 新版导入
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ColumnDetail from '../views/ColumnDetail.vue'
import CreatePost from '../views/CreatePost.vue'
import Register from '../views/Register.vue'
import PostDetail from '../views/PostDetail.vue'
import store from '../store'
import require from '../axios'
const routes = [
  {
    path: '/',
    component: Home,
    name: 'home'
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: {
      redirectAlreadyLogin: true
    }
  },
  {
    path: '/register',
    component: Register,
    name: 'Register',
    meta: {
      redirectAlreadyLogin: true
    }
  },
  {
    // 动态路由
    path: '/column/:id',
    component: ColumnDetail,
    name: 'column'
  },
  {
    path: '/create',
    component: CreatePost,
    name: 'create',
    meta: {
      requiredLogin: true
    }
  },
  {
    path: '/posts/:id',
    component: PostDetail,
    name: 'PostDetail'
  }
]
// 什么模式的history，这里采用的是不带#号的
const routerHistory = createWebHistory()
export const router = createRouter({
  history: routerHistory,
  routes
})
router.beforeEach((to, from, next) => {
  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  // 判断是否登录
  // 没登录
  if (!user.isLogin) {
    // 判断有没有token
    if (token) {
      // 有token，添加请求头
      require.defaults.headers.common.Authorization = `Bearer ${token}`
      store
        .dispatch('fetchCurrentUser') // 获取用户信息
        .then(() => {
          // 登录成功判断访问的页面是否是登录或注册，是的话就跳转首页，不是就走下去
          if (redirectAlreadyLogin) {
            next('/')
          } else {
            next()
          }
        })
        .catch((err) => {
          console.log(err)
          // 失败就删除token，跳转到登录页面
          store.commit('logOut')
          next('login')
        })
    } else {
      // 没有token，判断访问的页面是否需要登录才能访问，是就跳转到登录页面，不是就走下去
      if (requiredLogin) {
        next('login')
      } else {
        next()
      }
    }
  } else {
    // 登录，判断访问的页面是否是登录和注册页面，是的话就跳转到首页不是就走下去
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})
