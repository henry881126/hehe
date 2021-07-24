import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "@/styles/element-ui/theme/index.css";
import i18n from "./lang"; // internationalization

import "@/styles/index.scss"; // global css
import "@/styles/common.scss";
import App from "./App";
import store from "./store";
import router from "./router";
import "@/icons"; // icon
// import '@/permission' // permission control

// 以下为bpmn工作流绘图工具的样式
import "bpmn-js/dist/assets/diagram-js.css"; // 左边工具栏以及编辑节点的样式
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css"; // 右边工具栏样式

import "@/components/index.js";
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("../mock");
  mockXHR();
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.use(ElementUI, {
  size: "small", // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
});

Vue.config.productionTip = false;

let vue = new Vue({
  el: "#app",
  router,
  store,
  i18n,
  render: h => h(App)
});

export default vue;
