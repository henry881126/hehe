<!--
 * @Author: LeiRuiQi
 * @Date: 2020-08-01 15:08:36
 * @LastEditors: LeiRuiQi
 * @LastEditTime: 2020-08-03 18:09:01
--> 
<template>
  <div>
    <formView
      labelWidth="130px"
      :searchData="popupForm.searchData"
      :isInline="popupForm.isInline"
      :rules="popupForm.Rules"
      ref="popupForm"
      :formRef="popupForm.formRef"
      :searchForm="popupForm.searchForm"
      :searchHandle="popupForm.searchHandle"
    />
  </div>
</template>

<script>
export default {
  name: "tasks-jump",
  components: {},
  data() {
    return {
      popupForm: {
        isInline: false,
        searchData: {
          taskId: "",
          userMap: {
            userId: "100002"
          },
          ctrlMap: {
            specifyNextNode: "UserTask_10y0b3p",
            specifyNextOpers: []
          },
          businessMap: {
            resultRemark: ""
          },
          targetNode: "",
          targetName: "",
          jumpRemark: ""

        },
        formRef: "jumpForm",
        searchForm: [
          {
            type: "Input",
            label: "任务ID:",
            prop: "taskId",
            width: "220px",
            placeholder: "",
            disabled: true,
          },
          {
            type: "InputHandle",
            label: "目标节点:",
            prop: "targetNode",
            width: "220px",
            placeholder: "111",
            disabled: true,
            typetext: "text",
            buttonText: "选择",
            buttonType: "primary",
            buttonClick: () => {}
          },
          {
            type: "Input",
            label: "目标人员:",
            prop: "targetName",
            width: "220px",
            placeholder: "若输入多个目标人员请用‘，’号分隔",
          },
          {
            type: "Textarea",
            label: "跳转原因:",
            prop: "jumpRemark",
            width: "260px",
            placeholder: "",
          },
        ],
        searchHandle: [
          {
            label: "取消",
            type: "",
            handle: () => this.resetForm("popupForm", this.popupForm.formRef),
          },

          {
            label: "提交",
            type: "primary",
            handle: () =>
              this.searchHandleForm("popupForm", this.popupForm.formRef, 'setFlowInstanceExtendTimeOut'),
          },
        ],
        // 表单验证
        Rules: {
          taskId: [
            { required: true, message: '任务ID不能为空', trigger: 'blur' },
          ],
          targetNode: [
            { required: true, message: '请选择目标节点', trigger: 'blur' },
          ],
          targetName: [
            { required: true, message: '请输入目标人员', trigger: 'blur' },
          ],
        },
        footerList: []
      },
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>