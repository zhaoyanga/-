import { createStore, Commit } from 'vuex'
import require from '../axios'
import { AxiosRequestConfig } from 'axios'
export interface ResType<T = {}> {
  code: number
  msg: string
  data: T
}
// 图片的类型
export interface ImageProps {
  _id?: string
  url?: string
  createdAt?: string
  fitUrl?:string,
}
// 用户的类型
export interface UserProps {
  isLogin: boolean
  nickName?: string
  _id?: string
  column?: string
  email?: string,
  avatar?:ImageProps,
  description?:string
}

// 专栏详情的类型
export interface PostProps {
  _id?: string
  title: string
  excerpt?: string
  content?: string
  image?: ImageProps | string
  createdAt?: string
  column: string
  author?: string | UserProps
  isHTML?: boolean
}

// 专栏列表的类型
export interface ColumnProps {
  _id: string
  title: string
  avatar?: ImageProps
  description: string
}
// 错误提示类型
export interface GlobalErrorProps {
  status: boolean
  message?: string
}
// 全局的类型
export interface GlobalDataProps {
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
  loading: boolean
  token: string
  error: GlobalErrorProps
}

// 封装的async+commit函数
const getAndCommit = async (
  url: string,
  mutationsName: string,
  commit: Commit
) => {
  const { data } = await require.get(url)
  commit(mutationsName, data)
  return data
}
type methosType = 'post' | 'patch' | 'delete'
const postAndCommit = async (
  url: string,
  mutationsName: string,
  commit: Commit,
  payload: any,
  methods: methosType
) => {
    const { data } = await require[methods](url, payload)
    commit(mutationsName, data)
    return data
}
// const asyncAndCommit = async (url: string,
//   mutationsName: string,
//   commit: Commit, config: AxiosRequestConfig = { method: 'post' }) => {
//     const { data } = await require(url, config)
//     commit(mutationsName, data)
//     return data
// }

const store = createStore<GlobalDataProps>({
  state: {
    loading: false,
    columns: [],
    posts: [],
    user: { isLogin: false },
    token: localStorage.getItem('token') || '',
    error: { status: false }
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.find((i) => i._id === id)
    },
    getPostByCid: (state) => (cid: string) => {
      return state.posts.filter((post) => post.column === cid)
    },
    getPostDetail: (state) => (id:string) => {
      return state.posts.find((post) => post._id === id)
    }
  },
  actions: {
    // 专栏列表
    fetchColumns ({ commit }) {
      return getAndCommit('/columns', 'fetchColumns', commit)
    },
    // 专栏详情
    fetchColumn ({ commit }, currentId) {
      return getAndCommit(`/columns/${currentId}`, 'fetchColumn', commit)
    },
    // 专栏详情的列表
    fetchPosts ({ commit }, currentId) {
      return getAndCommit(`/columns/${currentId}/posts`, 'fetchPosts', commit)
    },
    login ({ commit }, payload) {
      return postAndCommit('/user/login', 'login', commit, payload, 'post')
    },
    fetchCurrentUser ({ commit }) {
      return getAndCommit('/user/current', 'fetchCurrentUser', commit)
    },
    loginAndFetch ({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    },
    async register ({ commit }, registerData) {
      return await require.post('/users', registerData)
    },
    // 新建文章
    createPost ({ commit }, payload) {
      return postAndCommit('/posts', 'createPost', commit, payload, 'post')
    },
    // 文章详情
    fetchPost ({ commit }, id) {
      return getAndCommit(`/posts/${id}`, 'fetchPost', commit)
    },
    // 修改文章
    updataPost ({ commit }, { id, payload }) {
      return postAndCommit(`/posts/${id}`, 'updataPost', commit, payload, 'patch')
      // return asyncAndCommit(`/posts/${id}`, 'updataPost', commit, { method: 'patch', data: payload })
    },
    // 删除文章
    deletePost ({ commit }, id) {
      return postAndCommit(`/posts/${id}`, 'deletePost', commit, '', 'delete')
    }
  },
  mutations: {
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns (state, data) {
      state.columns = data.data.list
    },
    fetchColumn (state, data) {
      state.columns = [data.data]
    },
    fetchPosts (state, data) {
      state.posts = data.data.list
    },
    setLoading (state, status) {
      state.loading = status
    },
    setError (state, e: GlobalErrorProps) {
      state.error = e
    },
    login (state, data) {
      const { token } = data.data
      state.token = data.data.token
      localStorage.setItem('token', token)
      require.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    fetchCurrentUser (state, data) {
      state.user = { isLogin: true, ...data.data }
    },
    logOut () {
      localStorage.removeItem('token')
      store.state.token = ''
      store.state.user.isLogin = false
      delete require.defaults.headers.common.Authorization
    },
    fetchPost (state, data) {
      state.posts = [data.data]
    },
    updataPost (state, { data }) {
      state.posts = state.posts.map(post => {
        if (post._id === data._id) {
          return data
        } else {
          return post
        }
      })
    },
    deletePost (state, { data }) {
      state.posts = state.posts.filter(post => post._id !== data._id)
    }
  }
})
export default store
