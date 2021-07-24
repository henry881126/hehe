/*
 * @Descripttion:
 * @version:
 * @Author: Ray Haiyoung
 * @Date: 2020-08-04 10:33:58
 * @LastEditors: Ray Haiyoung
 * @LastEditTime: 2020-08-06 12:01:05
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
let moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1').replace(/[*/]/g,"_");
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
const store = new Vuex.Store({
  modules: {
    ...modules
  },
  getters
})
export default store
