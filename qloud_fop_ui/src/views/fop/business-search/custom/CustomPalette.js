/*
 * @Author: LeiRuiQi
 * @Date: 2020-08-05 18:52:45
 * @LastEditors: LeiRuiQi
 * @LastEditTime: 2020-08-05 19:03:57
 */
/**
 * @description:  定义一个类
                  使用$inject注入一些需要的变量
                  在类中使用palette.registerProvider(this)指定这是一个palette
 * @param {type} 
 * @return {type} 
 */
export default class CustomPalette {
  constructor(bpmnFactory, create, elementFactory, palette, translate) {
      this.bpmnFactory = bpmnFactory;
      this.create = create;
      this.elementFactory = elementFactory;
      this.translate = translate;

      palette.registerProvider(this);
  }
  // 这个函数就是绘制palette的核心
  // group: 属于哪个分组, 比如tools、event、gateway、activity等等,用于分类
  // className: 样式类名, 我们可以通过它给元素修改样式
  // title: 鼠标移动到元素上面给出的提示信息
  // action: 用户操作时会触发的事件
  getPaletteEntries(element) {
    const {
      bpmnFactory,
      create,
      elementFactory,
      translate
    } = this;
    
    function createTask() {
      return function(event) {
          const businessObject = bpmnFactory.create('bpmn:Task');
          const shape = elementFactory.createShape({
              type: 'bpmn:Task',
              businessObject
          });
          console.log(shape) // 只在拖动或者点击时触发
          create.start(event, shape);
      }
    }

    return {
      'create.lindaidai-task': {
        group: 'model', // 分组名
        className: 'el-icon-s-help', // 样式类名
        title: translate('创建一个类型为lindaidai-task的任务节点'),
        action: { // 操作
            dragstart: createTask(), // 开始拖拽时调用的事件
            click: createTask() // 点击时调用的事件
        }
      }
    }
  }
}

CustomPalette.$inject = [
  'bpmnFactory',
  'create',
  'elementFactory',
  'palette',
  'translate'
]
