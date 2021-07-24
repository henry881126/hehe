<!--
 * @Author: LeiRuiQi
 * @Date: 2020-07-27 17:17:57
 * @LastEditors: LeiRuiQi
 * @LastEditTime: 2020-08-03 18:09:20
--> 
<template>
  <div>
    <formView
      class="flow-form"
      labelWidth="180px"
      :searchData="formData.searchData"
      :isInline="formData.isInline"
			:rules='formData.Rules'
			ref="form"
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
      :total="tableData.paramData.length"
    />
  </div>
</template>

<script>
export default {
  name: 'TaskedSearch',
  data() {
    return {
      formData: {
        isInline: true,
        searchData: {
          createTaskStartTime: "",
          createTaskEndDate: "",
          flowCode: "",
          flowId: "",
          taskId: "",
          businessSerialNumber: ""
        },
        formRef: "inlineForm",
        searchForm: [
          {
            type: "Time",
            label: "任务创建的开始时间:",
            prop: "createTaskStartTime",
            width: "220px",
            placeholder: "",
          },
          {
            type: "Date",
            label: "任务创建的截至日期:",
            prop: "createTaskEndDate",
            width: "220px",
            placeholder: "",
          },
          {
            type: "Input",
            label: "流程编码",
            prop: "flowCode",
            width: "220px",
            placeholder: "",
          },
          {
            type: "Input",
            label: "流程实例ID:",
            prop: "flowId",
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
            prop: "businessSerialNumber",
            width: "220px",
            placeholder: "",
          },
        ],
        searchHandle: [
          {
            label: "检索",
            type: "primary",
            handle: () => this.searchHandleForm(this.formRef),
          },

          { label: "重置", type: "primary", handle: () => this.resetForm(this.formRef) },
        ], 
        // 表单验证
        Rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        },
      },
      tableData:{
				isPage:true,
				operate:{
					width:200,
					list:["跳转", "任务终止", "更换处理人", "催办"]
				},
				showOverflowTooltip:false,
				paramTableHeader:[
          {prop:'number', label:'序号'},
          {prop:'id', label:'流程实例ID'},
          {prop:'tasksId', label:'任务ID'},
					{prop:'nodeType', label:'节点类型'},
          {prop:'nodeName', label:'节点名称'},
          {prop:'initiator', label:'发起人'},
          {prop:'startingTime', label:'发起时间'},
          {prop:'tasksCreateTime', label:'任务生成时间'},
          {prop:'tasksDoneTime', label:'任务完成时间'},
          {prop:'timeoutTime', label:'超时时间'},
          {prop:'isTimeout', label:'是否超时'},
				],
				paramData:[
          {
            number: 0, id:'467692087769300992', tasksId: '467692087769300991', nodeType: '业务节点', nodeName: '协储员主管审批', initiator: '张三',
            startingTime: '2020-07-14 06:40:40', tasksCreateTime: '2020-07-14 06:40:40', tasksDoneTime: '2020-07-14 06:40:40', timeoutTime: '', 
            isTimeout: '未超时'
          },
          {
            number: 0, id:'467692087769300992', tasksId: '467692087769300991', nodeType: '业务节点', nodeName: '协储员主管审批', initiator: '张三',
            startingTime: '2020-07-14 06:40:40', tasksCreateTime: '2020-07-14 06:40:40', tasksDoneTime: '2020-07-14 06:40:40', timeoutTime: '', 
            isTimeout: '未超时'
          },
				]
	
			},
    };
  },
  methods: {
    getIndex(index) {
      console.log(index);
    },
  },
};
</script>
<style lang='scss' scoped>
  .flow-form {
    text-align: left;
  }
</style>