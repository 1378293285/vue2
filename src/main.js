import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'

import VeeValidate, { Validator } from 'vee-validate'

import 'amfe-flexible/index.min.js'
import 'vant/lib/index.css'
// 图片懒加载
import VueLazyload from 'vue-lazyload'
// 配置相对时间的插件
import dayjs from 'dayjs'
import relaviveTime from 'dayjs/plugin/relativeTime'
// 设置dayjs语言样式  本地化语言包
import 'dayjs/locale/zh-cn'

// 修改语言样式
import zhCN from 'vee-validate/dist/locale/zh_CN'
// 拓展dayjs插件
dayjs.extend(relaviveTime)

Vue.use(VueLazyload)

Vue.use(Vant)
Vue.use(VeeValidate)

Validator.localize('zh_CN', zhCN)
// 使用语言包
dayjs.locale('zh-cn')

// 自定义验证规则
Validator.extend('photo', {
  getMessage: field => '请输入正确的手机号',
  validate: value => value
    .length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
})

// 封装定时器
// 1. 异步的处理
// 1.1 cb
// 1.2 Promise
// 1.3 async await
// 2. 看到异步-> 用Promise进行封装
Vue.prototype.$sleep = (time) => {
  return new Promise((resolve) => {
    setInterval(() => {
      resolve()
    }, time)
  })
}

// 过滤器
Vue.filter('relTime', (value) => {
  return dayjs().from(dayjs(value))
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
