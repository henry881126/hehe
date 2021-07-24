<!--
 * @Author: LeiRuiQi
 * @Date: 2020-07-27 17:33:01
 * @LastEditors: LeiRuiQi
 * @LastEditTime: 2020-08-05 20:17:00
--> 
<template>
  <div>
    <formView
      class="flow-form"
      labelWidth="100px"
      :searchData="formData.searchData"
      :isInline="formData.isInline"
			:rules="formData.Rules"
			ref="form"
			:formRef="formData.formRef"
      :searchForm="formData.searchForm"
      :searchHandle="formData.searchHandle"
    />
    <tableView 
			:showOverflowTooltip="tableData.showOverflowTooltip"
			:paramTableHeader="tableData.paramTableHeader"
			:paramData="tableData.paramData"
			:isPage="tableData.isPage"
    />
  </div>
</template>

<script>
import { flowInstanceAllSearch, historyInstanceAllSearch } from "@/api/fop/business-search";

export default {
  name: 'MessageSend',
  data() {
    return {
      treeSchema: {
        ref: "business-tree",
        class: "business-tree",
        treeData: [],
        defaultExpandAll: true,
        highlightCurrent: true,
        checkOnClickNode: true,
        isExpandOnClickNode: false,
      },
      formData: {
        isInline: true,
        searchData: {
          sendType: "",
          acceptId: "",
          tasksId: ""
        },
        formRef:"inlineForm",
        searchForm: [
          {
            type: "Time",
            label: "发送方式",
            prop: "sendType",
            width: "220px",
            placeholder: "",
          },
          {
            type: "Input",
            label: "接受人员ID",
            prop: "acceptId",
            width: "220px",
            placeholder: "",
          },
          {
            type: "Input",
            label: "任务ID",
            prop: "tasksId",
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
				showOverflowTooltip:false,
				paramTableHeader:[
          {prop:'number',label:'序号'},
					{prop:'id',label:'流程实例ID'},
					{prop:'tasksId',label:'任务ID'},
          {prop:'sendType',label:'发送方式'},
          {prop:'receiveMen',label:'接收人员'},
          {prop:'receiveAdress',label:'接收地址'},
          {prop:'sendResult',label:'发送结果'},
          {prop:'createTime',label:'创建时间'},
          {prop:'updateTime',label:'更新时间'},
				],
				paramData:[
          {
            number: 0, id:'467692087769300992', tasksId: 'KHQCJ', sendType: '事件中心', receiveMen: '张三',
            receiveAdress: '陕西西安高新区', sendResult: '成功', 
            createTime: '2020-07-14 06:40:40', updateTime: '2020-07-14 06:40:40'
          },
          {
            number: 1, id:'467692087769300992', tasksId: 'KHQCJ', sendType: '事件中心', receiveMen: '张三',
            receiveAdress: '陕西西安高新区', sendResult: '成功', 
            createTime: '2020-07-14 06:40:40', updateTime: '2020-07-14 06:40:40'
          },
				]
			},
    };
  },
  computed: {},
  mounted() {
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