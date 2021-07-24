
<template>
  <div>
    <form-view
      labelWidth="150px"
      :isInline="false"
      :searchData="newMenuData"
      :rules="newMenuRules"
      ref="newMenuForm"
      :searchForm="formItems"
      :searchHandle="actionHandle"
    ></form-view>
  </div>
</template>
<script>
  let status = [
    {label: "开", value: "1"},
    {label: "关", value: "2"},
  ];
  let types = [
    {label: "启用", value: "1"},
    {label: "停用", value: "2"},
  ];
  let positions = [
    {label: "左侧菜单", value: "1"},
    {label: "顶部菜单", value: "2"},
  ];
  let modes = [
    {label: "链接", value: "1"},
    {label: "点击", value: "2"},
  ];
  let scenes = [
    {label: "场景1", value: "1"},
    {label: "场景2", value: "2"},
  ];
  let propsSelect = {label: "label", value: "value"};
  let cascaderOptions =  [
      {
        "value": "zhinan",
        "label": "指南",
        "children": [
          {
            "value": "shejiyuanze",
            "label": "设计原则",
            "children": [
              {
                "value": "yizhi",
                "label": "一致"
              },
              {
                "value": "fankui",
                "label": "反馈"
              },
              {
                "value": "xiaolv",
                "label": "效率"
              },
              {
                "value": "kekong",
                "label": "可控"
              }
            ]
          },
          {
            "value": "daohang",
            "label": "导航",
            "children": [
              {
                "value": "cexiangdaohang",
                "label": "侧向导航"
              },
              {
                "value": "dingbudaohang",
                "label": "顶部导航"
              }
            ]
          }
        ]
      },
      {
        "value": "zujian",
        "label": "组件",
        "children": [
          {
            "value": "basic",
            "label": "Basic",
            "children": [
              {
                "value": "layout",
                "label": "Layout 布局"
              },
              {
                "value": "color",
                "label": "Color 色彩"
              },
              {
                "value": "typography",
                "label": "Typography 字体"
              },
              {
                "value": "icon",
                "label": "Icon 图标"
              },
              {
                "value": "button",
                "label": "Button 按钮"
              }
            ]
          },
          {
            "value": "form",
            "label": "Form",
            "children": [
              {
                "value": "radio",
                "label": "Radio 单选框"
              },
              {
                "value": "checkbox",
                "label": "Checkbox 多选框"
              },
              {
                "value": "input",
                "label": "Input 输入框"
              },
              {
                "value": "input-number",
                "label": "InputNumber 计数器"
              },
              {
                "value": "select",
                "label": "Select 选择器"
              },
              {
                "value": "cascader",
                "label": "Cascader 级联选择器"
              },
              {
                "value": "switch",
                "label": "Switch 开关"
              },
              {
                "value": "slider",
                "label": "Slider 滑块"
              },
              {
                "value": "time-picker",
                "label": "TimePicker 时间选择器"
              },
              {
                "value": "date-picker",
                "label": "DatePicker 日期选择器"
              },
              {
                "value": "datetime-picker",
                "label": "DateTimePicker 日期时间选择器"
              },
              {
                "value": "upload",
                "label": "Upload 上传"
              },
              {
                "value": "rate",
                "label": "Rate 评分"
              },
              {
                "value": "form",
                "label": "Form 表单"
              }
            ]
          },
          {
            "value": "data",
            "label": "Data",
            "children": [
              {
                "value": "table",
                "label": "Table 表格"
              },
              {
                "value": "tag",
                "label": "Tag 标签"
              },
              {
                "value": "progress",
                "label": "Progress 进度条"
              },
              {
                "value": "tree",
                "label": "Tree 树形控件"
              },
              {
                "value": "pagination",
                "label": "Pagination 分页"
              },
              {
                "value": "badge",
                "label": "Badge 标记"
              }
            ]
          },
          {
            "value": "notice",
            "label": "Notice",
            "children": [
              {
                "value": "alert",
                "label": "Alert 警告"
              },
              {
                "value": "loading",
                "label": "Loading 加载"
              },
              {
                "value": "message",
                "label": "Message 消息提示"
              },
              {
                "value": "message-box",
                "label": "MessageBox 弹框"
              },
              {
                "value": "notification",
                "label": "Notification 通知"
              }
            ]
          },
          {
            "value": "navigation",
            "label": "Navigation",
            "children": [
              {
                "value": "menu",
                "label": "NavMenu 导航菜单"
              },
              {
                "value": "tabs",
                "label": "Tabs 标签页"
              },
              {
                "value": "breadcrumb",
                "label": "Breadcrumb 面包屑"
              },
              {
                "value": "dropdown",
                "label": "Dropdown 下拉菜单"
              },
              {
                "value": "steps",
                "label": "Steps 步骤条"
              }
            ]
          },
          {
            "value": "others",
            "label": "Others",
            "children": [
              {
                "value": "dialog",
                "label": "Dialog 对话框"
              },
              {
                "value": "tooltip",
                "label": "Tooltip 文字提示"
              },
              {
                "value": "popover",
                "label": "Popover 弹出框"
              },
              {
                "value": "card",
                "label": "Card 卡片"
              },
              {
                "value": "carousel",
                "label": "Carousel 走马灯"
              },
              {
                "value": "collapse",
                "label": "Collapse 折叠面板"
              }
            ]
          }
        ]
      },
      {
        "value": "ziyuan",
        "label": "资源",
        "children": [
          {
            "value": "axure",
            "label": "Axure Components"
          },
          {
            "value": "sketch",
            "label": "Sketch Templates"
          },
          {
            "value": "jiaohu",
            "label": "组件交互文档"
          }
        ]
      }
  ];

  export default {
    data() {
      let that = this;
      return {
        /*新增菜单*/
        //新增菜单数据
        newMenuData: {
          coding: "",
          name: "",
          link: "",
          sceneName: "",
          type: "",
          position: "",
          icon: "",
          parent: "",
          status: "",
          mode: "",
          jumpMethod: "",
          describe: "",
        },
        //新增菜单项
        newMenuForm: [
          {
            type: "Input",
            label: "菜单编码",
            prop: "coding",
            width: "220px",
            placeholder: "请输入菜单编码",
          },
          {
            type: "Input",
            label: "菜单名称",
            prop: "name",
            width: "220px",
            placeholder: "请输入菜单名称",
          },
          {
            type: "Input",
            label: "菜单链接",
            prop: "link",
            width: "220px",
            placeholder: "请输入菜单链接",
          },
          {
            type: "Select",
            label: "场景名称",
            props: propsSelect,
            prop: "sceneName",
            options: scenes,
            width: "220px",
            placeholder: "请选择",
            change: (val) => {
              console.log(val);
            }
          },
          {
            type: "Select",
            label: "菜单类型",
            props: propsSelect,
            options: types,
            prop: "type",
            width: "220px",
            placeholder: "请选择",
            change: (val) => {
              console.log(val);
            }
          },
          {
            type: "Select",
            label: "菜单位置",
            props: propsSelect,
            prop: "position",
            options: positions,
            width: "220px",
            placeholder: "请选择菜单位置",
            change: (val) => {
            },
          },
          {
            type: "InputHandle",
            label: "菜单图标",
            prop: "icon",
            width: "220px",
            buttonText: "选择",
            placeholder: "请选择",
            buttonClick: () => {

            }
          },
          {
            type: "Cascader",
            label: "父菜单",
            prop: "parent",
            width: "220px",
            options: cascaderOptions,
            placeholder: "请选择父菜单",
          },
          {
            type: "Select",
            label: "菜单状态",
            props: propsSelect,
            prop: "status",
            options: status,
            width: "220px",
            placeholder: "请选择菜单状态",
            change: (row) => {
            },
          },
          {
            type: "Select",
            label: "跳转方式",
            props: propsSelect,
            prop: "mode",
            options: modes,
            width: "220px",
            placeholder: "请选择跳转方式",
            change: (row) => {

            },
          },
          {
            type: "Input",
            label: "跳转编码",
            prop: "jumpMethod",
            width: "220px",
            placeholder: "请输入跳转方式",
          },
          {
            type: "Input",
            typetext: "textarea",
            width: "220px",
            label: "菜单描述",
            prop: "describe",
            placeholder: "请输入菜单描述",
          },
        ],
        // 新增菜单表单验证
        newMenuRules: {
          coding: [
            {required: true, message: "请输入菜单编码", trigger: "blur"},
          ],
          name: [
            {required: true, message: "请输入菜单名称", trigger: "blur"},
          ],
          sceneName: [
            {required: true, message: "请选择场景名称", trigger: "change"},
          ],
          type: [
            {required: true, message: "请选择菜单类型", trigger: "change"},
          ],
          position: [
            {required: true, message: "请选择菜单位置", trigger: "change"},
          ],
          status: [
            {required: true, message: "请选择菜单状态", trigger: "change"},
          ],
        },
        //表单处理事件
        actionHandle: [
          {
            label: this.$t("common.operate.confirm"),
            type: "primary",
            handle: () => this.handleSubmit("newMenuForm"),
          },
          {
            label: this.$t("common.operate.cancel"),
            type: "primary",
            handle: () => this.resetForm("newMenuForm"),
          },
        ],
      }
    },
    computed: {
      formItems() {//菜单位置改变， 左侧菜单：展示菜单图标；  顶部菜单：展示父菜单
        let arr = [];
        if (this.newMenuData.position === "1") {
          this.newMenuForm.forEach((item) => {
            if (item.prop !== "parent") {
              arr.push(item);
            }
          })
        } else if (this.newMenuData.position === "2") {
          this.newMenuForm.forEach((item) => {
            if (item.prop !== "icon") {
              arr.push(item);
            }
          })
        } else {
          this.newMenuForm.forEach((item) => {
            if (item.prop !== "icon" && item.prop !== "parent") {
              arr.push(item);
            }
          })
        }
        return arr;
      }
    },
    methods: {
      handleSubmit(formName) {
        this.$refs[formName].$refs["inlineForm"].validate((valid) => {
          if (valid) {
            alert("submit!");
          } else {
            console.log("error submit!!");
            return false;
          }
        })
      },

      async resetForm(formName) {
        await this.$refs[formName].$refs["inlineForm"].resetFields();
      },
    }
  }
</script>
