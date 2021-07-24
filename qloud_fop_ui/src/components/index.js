import Vue from 'vue'
const componentsContext = require.context('./global', true, /\index.js$/)
componentsContext.keys().forEach(component => {
  // component文件夹下所有index.js路径
  console.log(component)
  // 读取index.js的内容，也就是每个组件的vue实列
  const componentConfig = componentsContext(component)
  console.log(componentConfig)
  // ctrl
  const ctrl = componentConfig.default || componentConfig
  console.log(ctrl)
  // 全局注册
  Vue.component(ctrl.name, ctrl)
})
