/*
 * @Descripttion: 
 * @version: 
 * @Author: Ray Haiyoung
 * @Date: 2020-08-04 10:33:58
 * @LastEditors: Ray Haiyoung
 * @LastEditTime: 2020-08-04 11:56:22
 */
import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import getters from './getters'
Vue.use(Vuex)

const modulesFiles = require.context('./modules/sample', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    ...modules
  },
  getters
})
export default store
