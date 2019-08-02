/**
  *用户相关借口封装模块
  *最佳建议：建议将所有的请求都封装成一个一个的小函数，需要的时候直接调用
  *   好处：1. 好维护，统一管理 2. 可重用
  * 遵循一个原则：不要直接在组件中发请求，最好都封装成函数进行调用
  */
import request from '@/utils/request.js'

export const login = ({
  mobile,
  code
}) => {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}
