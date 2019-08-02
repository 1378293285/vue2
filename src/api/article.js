// 文章列表相关的api
import request from '@/utils/request.js'

// 每个频道对应的文章列表
// * channel_id  是  频道id
// * timestamp  是  时间戳 单位毫秒，请求新的推荐数据传当前的时间戳
// 请求历史推荐数据传指定的时间戳
// * with_top   是  0或1  是否包含置顶，进入页面第一次请求时要包含置顶文章
// 1-包含置顶 0-不包含置顶

export const getArticle = (data) => {
  return request({
    method: 'get',
    url: '/app/v1_1/articles',
    params: data
  })
}
