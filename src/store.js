import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    secondMenu: JSON.parse(sessionStorage.getItem('secondMenu')),  // 二级导航栏
    checkedBoundingModel: '', // 绑定时选中的model
    showRight: false, // 首页显示右边
    rightType: '', // 首页
    deviceInfo: ''// 设备信息
  },
  mutations: {
    setSecondMenuData (state, data) {
      state.secondMenu = JSON.parse(sessionStorage.getItem('secondMenu'))
    },
    setShowRight (state, data) {
      state.showRight = data
    },
    setRightType (state, data) {
      state.rightType = data
    },
    setDeviceInfo (state, data) {
      state.deviceInfo = data
    },
    setCheckedBoundingModel (state, data) {
      state.checkedBoundingModel = data
    }
  },
  actions: {
    committSecondMenuData ({ state, commit }) {
      commit('setSecondMenuData')
    }
  }
})
