<!--
 * @Descripttion: 机构岗位角色关联关系
 * @version: 
 * @Author: tangpingying
 * @Date: 2020-07-27 14:15:28
 * @LastEditors: tangpingying
 * @LastEditTime: 2020-08-05 20:07:53
--> 

<template>
  <div class="org-post-role-list">
    <div class="condition-title">
      <h5>检索条件</h5>
    </div>
    <div>
      <form-view
        labelWidth="80px"
        :searchData="searchData"
        :rules="Rules"
        ref="form"
        :formRef="formRef"
        :searchForm="searchForm"
        :searchHandle="searchHandle"
      ></form-view>
    </div>
    <div class="but">
      <el-button type="primary" @click="addSubmit">新增</el-button>
    </div>
    <div class="g-table">
      <tableView
        :showOverflowTooltip="tableData.showOverflowTooltip"
        :operateObj="tableData.operate"
        :tableHeaderData="tableData.paramTableHeader"
        :tableData="tableData.paramData"
        :isPage="tableData.isPage"
        v-on:operate="getIndex"
      />
    </div>
    <div>
      <popup 
      :isShow="isShow"
      :title="editTitle"
      :size="size"
      :footerList="footerList"
      v-on:senddialogVisible="getdialogVisible">
        <template slot="content">
          <form-view
            labelWidth="110px"
            :searchData="editSearchData"
            :rules="editRules"
            ref="editform"
            :isInline="editIsInline"
            :formRef="editFormRef"
            :searchForm="editSearchForm"
            :searchHandle="editSearchHandle"
          ></form-view>
        </template>
        <template slot="content">
         <!--  <p>123</p> -->
          <paramDescription
          :highlightCurrentRow='eidttableData.showOverflowTooltip'
          :operateObj="eidttableData.operate"
          :paramTableHeader="eidttableData.paramTableHeader"
          :paramData="eidttableData.paramData"
           :isPage="eidttableData.isPage"
          v-on:operate="getIndex" />
        </template>
      </popup>
    </div>
  </div>
</template>

<script>
let postList = [
  { label: "岗位名称1", value: "M" },
  { label: "岗位名称2", value: "F" },
];
let postListProps = { label: "label", value: "value" };
export default {
  data() {
    return {
      searchData: {
        orgName: null,
        ip: null
      },
      formRef: "inlineForm",
      searchForm: [
        {
          type: "Input",
          label: "机构编码",
          prop: "orgName",
          width: "220px",
          placeholder: "请输入机构编码",
        },

        {
          type: "Input",
          label: "机构名称",
          prop: "ip",
          width: "220px",
          placeholder: "请输入机构名称",
        },
        {
          type: "Input",
          label: "岗位编码",
          prop: "ip2",
          width: "220px",
          placeholder: "请输入岗位编码",
        },      
        {
          type: "Input",
          label: "岗位名称",
          prop: "ip3",
          width: "220px",
          placeholder: "请输入岗位名称",
        },
         {
          type: "Input",
          label: "角色编码",
          prop: "ip4",
          width: "220px",
          placeholder: "请输入角色编码",
        },
        {
          type: "Input",
          label: "角色名称",
          prop: "ip5",
          width: "220px",
          placeholder: "请输入角色名称",
        }
      ],
      Rules: {
       /*  orgName: [
          { required: true, message: "请输入机构名称", trigger: "blur" },
          { min: 1, max: 99, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        ip: [
          { required: true, message: "请输入IP", trigger: "blur" },
          { min: 1, max: 50, message: '请输入有效ip地址', trigger: 'blur' }
        ]*/
      },

      searchHandle: [
        {
          label: "查询",
          type: "primary",
          handle: () => this.searchHandleForm(this.formRef),
        },

        {
          label: "重置",
          type: "primary",
          handle: () => this.resetForm(this.formRef),
        },
      ],
      tableData: {
        isPage: true,
        operate: {
          width: 200,
          list: [
            {
              label: this.$t("common.operate.edit"),
              id: "modify",
            },
            {
              label: this.$t("common.operate.delete"),
              id: "delete",
            },
          ],
        },
        showOverflowTooltip: false,
        paramTableHeader: [
          { prop: "serial", label: "序号" },
          { prop: "orgId", label: "机构编码" },
          { prop: "orgName", label: "机构名称" },
          { prop: "string1", label: "岗位编码" },
          { prop: "string2", label: "岗位名称" },
          { prop: "string3", label: "角色编码" },
          { prop: "string4", label: "角色名称" },
          { prop: "starttime", label: "创建时间" },
          { prop: "undatatime", label: "更新时间" },
        ],
        paramData: [
          {
            serial: "1",
            orgId: "01",
            orgName: "机构名称1",
            string1: "01",
            string2: "机构名称1",
            string3: "01",
            string4: "角色名称1",
            starttime: "2019-03-24 17:07:54",
            undatatime: "2019-03-24 17:07:54",
            value: "",
          },
          {
            serial: "2",
            orgId: "02",
            orgName: "机构名称2",
            string1: "02",
            string2: "岗位名称2",
            string3: "02",
            string4: "角色名称2",
            starttime: "2019-03-24 17:07:54",
            undatatime: "2019-03-24 17:07:54",
            value: "",
          }
        ],
      },
    // 弹窗部分数据
      isShow:false,
      editTitle:"新增",
      size:"medium",
      editSearchData: {
        orgName: null,
        ip: null
      },
      editSearchHandle: [
        {
          label: "查询",
          type: "primary",
          handle: () => this.searchHandleForm(this.formRef),
        },

        {
          label: "重置",
          type: "primary",
          handle: () => this.resetForm(this.formRef),
        },
      ],
			footerList:[{"name":"取消",type:"","isSubmit":false},{"name":"确定",type:"primary","isSubmit":true}],
			eidttableData:{
        isPage: false,
        operate:{
          width:200,
          list:["确认"]
        },
        showOverflowTooltip:true,
        paramTableHeader:[
          {prop:'name',label:'序号'},
          {prop:'tags',label:'角色编号'},
          {prop:'time',label:'更新名称'}
        ],
        paramData:[
          {name:"1",tags:"100001",time:"角色1",value:""},
          {name:"2",tags:"100002",time:"角色2",value:""},
          {name:"3",tags:"100003",time:"角色3",value:""}
        ]
      },
      editIsInline : true,
      editFormRef: "inlineForm",
      editSearchForm: [
        {
          type: "Input",
          label: "机构名称",
          prop: "orgName",
          width: "220px",
          placeholder: "点击显示机构树",
        },
        {
          type: "Select",
          label: "岗位名称",
          prop: "postName",
          width: "220px",
          options: postList,
          props: postListProps,
          change: (row) => "",
          placeholder: "请选择",
        },
        {
          type: "Input",
          label: "角色编码",
          prop: "roleId",
          width: "220px",
          placeholder: "请输入角色编码",
        },
        {
          type: "Input",
          label: "角色名称",
          prop: "roleName",
          width: "220px",
          placeholder: "请输入角色名称",
        }
        
      ],
      editRules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
          ]
				},
			}
  },
  methods: {
    getIndex(e) {
      //e.row.value 即可获取到操作项
      if (e.operate.id === "modify") {
        this.editSubbmit(e.row);
      }else if(e.operate.id === "delete"){
        this.deleteSubmit(e.row); 
      }
      console.log(e)
    },
    onSubmit() {},
    addSubmit() {
      this.isShow = true;
      this.editTitle = "新增机构岗位角色";
    },
    editSubbmit() {
      this.isShow = true;
      this.editTitle = "修改机构岗位角色";
    },
    deleteSubmit() {
      console.log(删除);
    },
    async resetForm(formName) {
      await this.$refs["form"].$refs[formName].resetFields();
    },
    async searchHandleForm(formName) {
      // console.log("searchHandle");
      await this.$refs["form"].$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //弹出窗口关闭
    getdialogVisible(flag){
      if(flag){
      }
      this.isShow=false;
		}
  },
};
</script>
<style lang="scss" scoped>
.org-post-role-list {
  display: flex;
  flex-direction: column;
  height: 100%;

  .condition-title {
    margin: 20px;
    font-size: 18px;
  }

  .but {
    margin: 20px;
  }

  .g-table {
    flex: 1;
  }
}
</style>