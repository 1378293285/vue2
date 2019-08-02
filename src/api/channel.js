// 频道相关的请求
import request from '@/utils/request.js'

// 获取频道数据
// 1. 设置header的token -> 用户频道数据
// 2. 不设置token  默认推荐的数据
export const getChannelUser = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user/channels'

  })
}
