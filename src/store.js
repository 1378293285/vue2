import Vue from 'vue'
import Vuex from 'vuex'
// import {getUser, setUser} from '@/utils/auth.js'

// 把auth.js模块的所有方法变成auth对象的属性
import * as auth from '@/utils/auth.js'
// auth.getUser()

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: auth.getUser()
  },
  mutations: {
    setUser (state, data) {
      // const data = auth.setUser(data)
      // 修改state
      state.user = data
      // 将数据放到本地存储
      auth.setUser(data)
    }
  }
})
export default store
