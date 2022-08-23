import store from '@/store'
import axios from 'axios'
const require = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 60000
})
require.interceptors.request.use((config) => {
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  let icode = '74000DA37FCD8A7F'
  if (config.method === 'get') {
    config.params = { ...config.params, icode }
  } else if (config.method === 'post') {
    if (config.data instanceof FormData) {
      config.data.append('icode', icode)
    } else {
      // 普通的 body 对象，添加到 data 中
      config.data = { ...config.data, icode }
    }
  } else {
    config.data = { ...config.data, icode }
  }

  // 其他请求，添加到 body 中
  // 如果是上传文件，添加到 FormData 中

  return config
})
require.interceptors.response.use(
  (config) => {
    setTimeout(() => {
      store.commit('setLoading', false)
    }, 1000)
    return config
  },
  (e) => {
    const { error } = e.response.data
    store.commit('setError', { status: true, message: error })
    store.commit('setLoading', false)
    return Promise.reject(error)
  }
)
export default require
