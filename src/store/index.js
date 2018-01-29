import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

// 根级别的state，非全局状态建议分模块写在modules里
const state = {
  navTab: 0,    //导航切换
  userStatus: 0, //用户登陆注册框  个人info  切换,
  userNavStatus: 0
}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
