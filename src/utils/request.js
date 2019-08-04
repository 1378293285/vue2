// 配置axios相关代码
// 1. baseURL: url
// 2. 请求拦截器
// 3. 响应拦截器 import axios from 'axios'

import axios from 'axios'
import store from '@/store.js'
import JSONBig from 'json-bigint'

// axios.get
// axios.create() 返回一个和axios对象一样的对象
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

// 配置JSONBig包处理文章ID超限的问题
request.defaults.transformResponse = [function (data) {
  try {
    return JSONBig.parse(data)
  } catch (error) {
    return data
  }
}]

// 请求拦截器
request.interceptors.request.use(function (config) {
  // console.log(config)
  // console.log(store.state.user)

  const { user } = store.state
  // 如果当前的请求不是登录请求
  // 第一种方式写法
  // if (config.url !== '/app/v1_0/authorizations') {
  //   // 如果有token 设置请求头
  //   if (user) {
  //     config.headers.Authorization = `Bearer ${user.token}`
  //   }
  // }

  // 第二种方式写法
  // if (config.url !== '/app/v1_0/authorizations' && user) {
  //   config.headers.Authorization = `Bearer ${user.token}`
  // }

  // 第三种方式写法 使用&& || 代替if
  config.url !== '/app/v1_0/authorizations' && user &&
    (config.headers.Authorization = `Bearer ${user.token}`)

  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  // 如果响应结果对象中有 data，则直接返回这个 data 数据
  // 如果响应结果对象中没有 data，则不作任何处理，直接原样返回这个数据
  return response.data.data || response.data
}, function (error) {
  return Promise.reject(error)
})

export default request
