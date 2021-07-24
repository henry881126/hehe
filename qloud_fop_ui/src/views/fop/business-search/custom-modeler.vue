<!--
 * @Author: LeiRuiQi
 * @Date: 2020-08-03 13:53:00
 * @LastEditors: LeiRuiQi
 * @LastEditTime: 2020-08-05 19:27:20
--> 
<template>
  <div class="containers" ref="content">
    <div class="canvas" ref="canvas"></div>
    <div id="js-properties-panel" class="panel"></div>
  </div>
</template>


<script>
import BpmnModeler from "bpmn-js/lib/Modeler";
// panel
// import propertiesPanelModule from 'bpmn-js-properties-panel'
// import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
// import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
// 汉化
import customTranslate from "./bpmn/customTranslate"
import customModule from './customModeler'

import { xmlStr } from "./fxml"; // 这里是直接引用了xml字符串

export default {
  name: "flow-basic",
  components: {
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      // bpmn建模器
      bpmnModeler: null,
      container: null,
      canvas: null,
    };
  },
  methods: {
    init() {
      // 获取到属性ref为“content”的dom节点
      this.container = this.$refs.content;
      // 获取到属性ref为“canvas”的dom节点
      const canvas = this.$refs.canvas;
      // const customTranslateModule = {
      //   translate: ["value", customTranslate]
      // };
      // 建模
      this.bpmnModeler = new BpmnModeler({
        container: canvas,
        // 添加控制板
        propertiesPanel: {
          parent: '#js-properties-panel'
        },
        // 右边的属性栏
        additionalModules: [
          // propertiesProviderModule,
          // propertiesPanelModule,
          // customTranslateModule,
        ],
        moddleExtensions: {
          camunda: camundaModdleDescriptor
        }
      });
      this.createNewDiagram();
    },
    createNewDiagram() {
      // 将字符串转换成图显示出来
      this.bpmnModeler.importXML(xmlStr, (err) => {
        if (err) {
          // console.error(err)
        } else {
          // 这里是成功之后的回调, 可以在这里做一系列事情
          this.success();
        }
      });
    },
    success() {
      console.log('创建成功!');
      this.addEventBusListener();
    },
    addEventBusListener() {
      // 监听 element
      let that = this
      const eventBus = this.bpmnModeler.get('eventBus')
      const eventTypes = ['element.click', 'element.changed', 'element.updateLabel']
      eventTypes.forEach(function(eventType) {
        eventBus.on(eventType, function(e) {
          console.log(eventType)
          if (!e || e.element.type == 'bpmn:Process') return
          if (eventType === 'element.changed') {
            // that.elementChanged(e)
          } else if (eventType === 'element.click') {
            console.log('点击了element', e)
            // if (e.element.type === 'bpmn:Task') {
            // }
          } else if (eventType === 'element.updateLabel') {
            console.log('element.updateLabel', e.element)
          }
        })
      })
    }
  },
};
</script>

<style scoped>
  .containers{
    position: absolute;
    background-color: #ffffff;
    width: 100%;
    height: 100%;
  }
  .canvas{
    width: 100%;
    height: 100%;
  }
  .panel{
    position: absolute;
    right: 0;
    top: 0;
    width: 300px;
  }
</style>