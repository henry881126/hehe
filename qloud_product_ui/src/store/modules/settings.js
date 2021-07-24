/*
 * @Descripttion: 
 * @version: 
 * @Author: Ray Haiyoung
 * @Date: 2020-08-04 10:33:58
 * @LastEditors: Ray Haiyoung
 * @LastEditTime: 2020-08-04 11:16:13
 */
import defaultSettings from '@/settings'

const { showSettings, fixedHeader, sidebarLogo,pageSizes,pageLayout,pagerCount,size } = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  pageSizes:pageSizes,
  pageLayout:pageLayout,
  pagerCount:pagerCount,
  size:size
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
