<!--
 * @Author: LeiRuiQi
 * @Date: 2020-07-27 16:38:05
 * @LastEditors: LeiRuiQi
 * @LastEditTime: 2020-08-03 18:08:39
--> 
<template>
  <div>
    <formView
      class="flow-form"
      labelWidth="180px"
      :searchData="formData.searchData"
      :isInline="formData.isInline"
			:rules='formData.Rules'
			ref="todoform"
			:formRef = "formData.formRef"
      :searchForm="formData.searchForm"
      :searchHandle="formData.searchHandle"
    />
    <tableView 
			:showOverflowTooltip='tableData.showOverflowTooltip'
			:operateObj="tableData.operate"
			:paramTableHeader="tableData.paramTableHeader"
			:paramData="tableData.paramData"
			:isPage = "tableData.isPage"
			v-on:operate="getIndex"
      :total="tableData.totalRows"
    />
    <!-- :footerList="popupTable.footerList" -->
    <popup
      :title="popupTitle"
      :isShow="isPopupShow"
      :size="popupSize"
      
      v-on:senddialogVisible="getdialogVisible"
    >
      <template slot="content">
        <!-- <paramDescription
          v-if="0"
          :paramTableHeader="popupTable.paramTableHeader"
          :paramData="popupTable.paramData"
          :isPage="popupTable.isPage"
        /> -->
        <formView
          v-if="popupTitle=='任务跳转'"
          labelWidth="130px"
          :searchData="popupForm.searchData"
          :isInline="popupForm.isInline"
          :rules="popupForm.Rules"
          ref="popupForm"
          :formRef="popupForm.formRef"
          :searchForm="popupForm.searchForm"
          :searchHandle="popupForm.searchHandle"
        />
      </template>
    </popup>
  </div>
</template>

<script>
import { backlogTaskSearch, backlogTaskJumpSub, backlogTaskJumpSearch } from "@/api/fop/business-search"
import { renderTableProp } from "./business-untils.js"

export default {
  name: 'to-do-tasks',
  data() {
    return {
      isPopupShow: false,
      popupTitle: "任务跳转",
      popupSize: "medium",
      curPage: 1,
      formData: {
        isInline: true,
        searchData: {
          createDateBegin: "",
          createDateEnd: "",
          processCode: "",
          processId: "",
          taskId: "",
          bussManFlow: "",
          pageRows: 10,
          curPage: 1
        },
        formRef: "ctoDoForm",
        searchForm: [
          {
            type: "DateTime",
            label: "任务创建的开始时间:",
            prop: "createDateBegin",
            width: "220px",
            placeholder: "",
            valueFormat: "yyyy-MM-dd HH:mm:ss"
          },
          {
            type: "DateTime",
            label: "任务创建的截至日期:",
            prop: "createDateEnd",
            width: "220px",
            placeholder: "",
            valueFormat: "yyyy-MM-dd HH:mm:ss"
          },
          {
            type: "Input",
            label: "流程编码",
            prop: "processCode",
            width: "220px",
            placeholder: "",
          },
          {
            type: "Input",
            label: "流程实例ID:",
            prop: "processId",
            width: "220px",
            placeholder: "",
          },
          {
            type: "Input",
            label: "任务ID",
            prop: "taskId",
            width: "220px",
            placeholder: "",
          },
          {
            type: "Input",
            label: "业务流水号:",
            prop: "bussManFlow",
            width: "220px",
            placeholder: "",
          },
        ],
        searchHandle: [
          {
            label: "检索",
            type: "primary",
            handle: () => this.searchHandleForm("todoform", this.formData.formRef, "toDoSearch"),
          },
          { label: "重置", type: "primary", handle: () => this.resetForm("todoform", this.formData.formRef)},
        ],
      },
      tableData: {
        isPage: true,
        totalRows: 0,
				operate:{
					width:130,
					list:["跳转", "任务终止", "更换处理人", "催办"]
				},
				showOverflowTooltip:false,
				paramTableHeader:[
          {prop:'processId', label:'流程实例ID'},
          {prop:'taskId', label:'任务ID'},
          {prop:'customTaskType', label:"节点类型"},
          {prop:'taskName', label:"节点名称"},
          {prop:'workCreater', label:'发起人'},
          {prop:'startDate', label:'发起时间'},
          {prop:'createDate', label:'任务生成时间'},
          {prop:'estEndTime', label:'超时时间'},
          {prop:'customIsTime', label:'是否超时'},
          {prop:'customWorkState', label:'流程状态'},
				],
				paramData:[
          {
            number: 0, id:'467692087769300992', code: 'KHQCJ', start: '张三', createTime: '2020-07-14 06:40:40', timeoutTime: '', 
            isTimeout: '未超时', flowState: '正常运行'
          },
          {
            number: 1, id:'467692087769300993', code: 'KHQCJ', start: '王五', createTime: '2020-07-14 06:40:40', timeoutTime: '', 
            isTimeout: '未超时', flowState: '挂起'
          },
				]
	
      },
      popupTable: {
        paramData: [],
        paramTableHeader: [
          { prop: "processId", label: "流程实例ID" },
          { prop: "taskId", label: "任务ID" },
          { prop: "customTaskType", label: "节点类型" },
          { prop: "taskName", label: "节点名称" },
          { prop: "createDate", label: "提交时间" },
          { prop: "workOperator", label: "处理人" },
          { prop: "doResult", label: "处理结果" },
          { prop: "doRemark", label: "处理意见" },       
        ],
        isPage: false,
        footerList: [{ type: "primary", name: "关闭" }],
      },
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
  methods: {
    getdialogVisible() {
      this.isPopupShow = false;
    },
    getIndex({ row }) {
      if (row.value === "跳转") {
        console.log(111);
        this.$router.push({ name: "taskJump", params: { processId: row.id }});
      }
      this.isPopupShow = true;
    },
    resetForm(form, formName){
      this.$nextTick(() => {
        this.$refs[form].$refs[formName].resetFields();
        if (this.isPopupShow) {
          this.getdialogVisible();
        }
      });
		},
    async searchHandleForm(form, formName, fnName) {
      await this.$refs[form].$refs[formName].validate((valid) => {
				if (valid) {
          console.log('submit!');
          this[fnName]();
				} else {
					console.log('error submit!!');
					return false;
				}
			});
    },	
    toDoSearch() {
      Object.assign(this.formData.searchData, { curPage: this.curPage });
      backlogTaskSearch(this.formData.searchData).then(({pageData}) => {
        this.tableData.paramData = pageData.result.map(item => {
          item.customTaskType = renderTableProp(
            [
              { type: "task", value: "任务节点" },
              { type: "approve", value: "审批节点" },
              { type: "auto", value: "字段节点" },
              { type: "subproc", value: "子流程节点" },
              { type: "sign", value: "会签节点" },
            ],
          item.taskType);
          item.customIsTime = renderTableProp(
            [
              { type: "0", value: "正常" },
              { type: "1", value: "超时不霸屏" },
              { type: "2", value: "超时且霸屏" },
            ],
          item.isTime);
          item.customWorkState = renderTableProp(
            [
              { type: "0", value: "未处理" },
              { type: "1", value: "已处理" },
              { type: "2", value: "已挂起" },
            ],
          item.workState);
          return item;
        });
        this.tableData.paramData = pageData.result;
        this.tableData.totalRows = pageData.totalRows;
      });
    },
  },
};
</script>
<style lang='scss' scoped>
</style>