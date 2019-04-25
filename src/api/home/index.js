import request from '@/utils/request'

// 用户登录
export function userLogin (query) {
  return request({
    url: '/login',
    method: 'post',
    params: query
  })
}
