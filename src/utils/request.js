import axios from 'axios'

export const baseurl = 'http://192.168.99.147:9999/'
axios.defaults.withCredentials = true
// 创建axios实例
const service = axios.create({
  // baseURL: 'http://192.168.99.121:9999',
  // baseURL: 'http://192.168.99.147:9999',
  baseURL: 'http://192.168.99.147:9999',
  // baseURL: 'http://192.168.99.57:9999',
  timeout: 20000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  // if (store.getters['auth/token']) {
  //     config.headers['authToken'] = store.getters['auth/token'] // 让每个请求携带token--['authToken']为自定义key 请根据实际情况自行修改
  // }
  return config
}, error => {
  // Do something with request error
//   console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    // /**
    //      * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
    //      * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
    //      */
    // const code = response.data.code
    // // 50014:Token 过期了 50012:其他客户端登录了 50008:非法的token
    // if (code == -999) {
    //   Message({
    //     message: response.data.message,
    //     type: 'error',
    //     duration: 2 * 1000
    //   })
    //   // 登出
    // } else {
    return response
    // }
  },
  error => {
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 2 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
