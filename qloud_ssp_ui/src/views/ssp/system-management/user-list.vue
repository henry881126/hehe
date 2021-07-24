<template>
  <div class="home">
    <Title :list="list" />
    <div class="til">
      <p>{{ $t('common.operate.searchConditions') }}</p>
    </div>
    <div>
      <form-view
        labelWidth="100px"
        :searchData="searchData"
        :rules="Rules"
        ref="form"
        :formRef="formRef"
        :searchForm="searchForm"
        :searchHandle="searchHandle"
      ></form-view>
    </div>
    <div class="but">
      <el-button type="primary" @click="addSubmit">{{ $t('common.operate.add') }}</el-button>
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
    <!-- 弹出层 -->
    <div>
      <popup
        :isShow="isShow"
        :title="text"
        :size="size"
        :footerList="footerList"
        v-on:senddialogVisible="getdialogVisible"
      >
        <template slot="content">
          <div class="formtxet">
            <P>基本信息</P>
          </div>
          <form-view
            labelWidth="90px"
            :searchData="editSearchData"
            :rules="Rules"
            ref="editform"
            :isSearch="isSearch"
            :formRef="editFormRef"
            :searchForm="editSearchForm"
          ></form-view>
        </template>
        <template slot="content">
          <div class="formtxet">
            <el-row>
              <el-col :span="5">
                <P>岗位角色信息</P>
              </el-col>
              <el-col :span="7">
                <el-button type="primary" @click="addrole">新增岗位角色</el-button>
              </el-col>
            </el-row>
          </div>
          <form-view
            labelWidth="90px"
            :searchData="addSearchData"
            :rules="Rules"
            ref="addform"
            :isSearch="isSearch"
            :formRef="addFormRef"
            :searchForm="addSearchForm"
          ></form-view>
        </template>
      </popup>
    </div>
  </div>
</template>

<script>
import { queryUserList } from '@/api/ssp/user'

let status = [
  { label: "开", value: "1" },
  { label: "关", value: "2" },
];
let department = [
  { label: "商务部", value: "1", resdr: "234" , id: "3" },
  { label: "产品部", value: "2", resdr: "234" , id: "6" },
];
let legal = [
  { label: "0222", value: "1" },
  { label: "0342", value: "2" },
];
let sexs = [
  { label: "男", value: "1" },
  { label: "女", value: "2" },
];
let highesteducations = [
  { label: "本科", value: "1" },
  { label: "专科", value: "2" },
];
let idtypes = [
  { label: "本科", value: "1" },
  { label: "专科", value: "2" },
];
let propsSelect = { label: "label", value: "value" };

let interstProps = { label: "label", value: "value" };

const adddata = [
  {
    type: "Input",
    label: "岗位",
    prop: "station",
    width: "200px",
    disabled: false,
    placeholder: "请输入内容",
  },
  {
    type: "Inputinquire",
    label: "角色",
    prop: "role",
    width: "100px",
    placeholder: "请输入内容",
    labels: "搜索",
    icon: "el-icon-search",
    typestyle: "primary",
    quirele: () => this.go(),
  },
];

export default {
  name: "Home",
  data() {
    return {
      list: [
        { name: "首页", path: "/" },
        { name: "系统管理", path: "/index" },
        { name: "人员管理", path: "/home" },
      ],
      //form 部分
      searchData: {
        // name: null,

        username: null,

        status: null,

        date: "",

        interst: [],
      },
      formRef: "inlineForm",
      searchForm: [
        {
          type: "Input",
          label: "人员姓名",
          prop: "name",
          width: "220px",
          placeholder: "请输入姓名",
        },

        {
          type: "Input",
          label: "登陆用户明名",
          prop: "username",
          width: "220px",
          placeholder: "请输入年龄",
        },

        {
          type: "Select",
          label: "状态",
          prop: "status",
          width: "220px",
          options: status,
          props: propsSelect,
          change: (row) => "",
          placeholder: "请选择性别",
        },

        {
          type: "Select",
          label: "所属部门",
          prop: "department",
          width: "220px",
          options: department,
          props: propsSelect,
          change: (row) => "",
          placeholder: "请选择性别",
        },

        {
          type: "Select",
          label: "法人编号",
          prop: "legal",
          width: "220px",
          options: legal,
          props: propsSelect,
          change: (row) => "",
          placeholder: "请选择性别",
        },

        {
          type: "Select",
          label: "性别",
          prop: "sex",
          width: "220px",
          options: sexs,
          props: propsSelect,
          change: (row) => "",
          placeholder: "请选择性别",
        },
      ],

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

        {
          label: "高级搜索",
          type: "primary",
          //   handle: () => this.resetForm(this.formRef),
        },
      ],
      Rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ]
      },

      // table部分
      tableData: {
        isPage: true,
        operate: {
          width: 200,
          list: [{label:"修改",id: "1"}, {label:"查看",id: "2"}, {label:"注销账户",id: "3"}, {label:"重置密码",id: "4"}, {label:"冻结账号",id: "5"}],
        },
        showOverflowTooltip: false,
        paramTableHeader: [
          { prop: "serial", label: "序号" },
          { prop: "coding", label: "人员编码" },
          { prop: "name", label: "人员姓名" },
          { prop: "username", label: "登陆用户名" },
          { prop: "states", label: "状态" },
          { prop: "institution", label: "所属机构" },
          { prop: "department", label: "所属部门" },
          { prop: "tags", label: "用户类型" },
          { prop: "gender", label: "性别" },
          { prop: "starttime", label: "创建时间" },
          { prop: "undatatime", label: "更新时间" },
        ],
        paramData: [
          {
            serial: "1",
            coding: "023",
            name: "张三",
            username: "sss",
            states: "状态",
            institution: "所属机构",
            department: "所属部门",
            tags: "用户类型",
            gender: "女",
            starttime: "2019-03-24 17:07:54",
            undatatime: "2019-03-24 17:07:54",
            value: "",
          },
          {
            serial: "2",
            coding: "024",
            name: "张三",
            username: "lll",
            states: "状态",
            institution: "开始",
            department: "所属部门",
            tags: "用户类型",
            gender: "男",
            starttime: "2019-03-24 17:07:54",
            undatatime: "2019-03-24 17:07:54",
            value: "",
          },
          {
            serial: "3",
            coding: "025",
            name: "张三",
            username: "yyy",
            states: "状态",
            institution: "商务部",
            department: "所属部门",
            tags: "用户类型",
            gender: "女",
            starttime: "2019-03-24 17:07:54",
            undatatime: "2019-03-24 17:07:54",
            value: "",
          },
        ],
      },
      //弹出层部分
      isShow: false,
      size: "small",
      text: "",
      footerList: [
        { name: "取消", type: "", isSubmit: false },
        { name: "确定", type: "primary", isSubmit: true },
      ],
      // 新增 - 用户信心
      editSearchData: {
        name: null,

        age: null,

        sex: null,

        date: "",
      },
      editFormRef: "inlineForm",
      editSearchForm: [
        {
          type: "Input",
          label: "人员姓名",
          prop: "name",
          width: "200px",
          disabled: false,
          placeholder: "请输入内容",
        },

        {
          type: "Input",
          label: "人员编号",
          prop: "nameid",
          width: "200px",
          placeholder: "请输入内容",
        },
        {
          type: "Input",
          label: "登陆用户名",
          prop: "username",
          width: "200px",
          placeholder: "请输入内容",
        },
        {
          type: "Input",
          label: "用户类型",
          prop: "Inputtype",
          width: "200px",
          placeholder: "请输入内容",
        },
        {
          type: "Inputinquire",
          label: "所属机构",
          prop: "subsidiaryorgan",
          width: "100px",
          placeholder: "请输入内容",
          labels: "搜索",
          icon: "el-icon-search",
          typestyle: "primary",
          quirele: () => this.go(),
        },
        {
          type: "Input",
          label: "邮件地址",
          prop: "email",
          width: "200px",
          placeholder: "请输入内容",
        },
        {
          type: "Inputinquire",
          label: "密码策略",
          prop: "passwordstrategy",
          width: "100px",
          placeholder: "请输入内容",
          labels: "搜索",
          icon: "el-icon-search",
          typestyle: "primary",
          quirele: () => this.go(),
        },
        {
          type: "Select",
          label: "性别",
          prop: "sex",
          width: "220px",
          options: sexs,
          props: propsSelect,
          change: (row) => "",
          placeholder: "请选择",
        },
        {
          type: "Date",
          label: "出生日前",
          prop: "birthdata",
          width: "220px",
          placeholder: "请选择日期",
        },
        {
          type: "Select",
          label: "证件类型",
          prop: "idtype",
          width: "220px",
          options: idtypes,
          props: propsSelect,
          change: (row) => "",
          placeholder: "请选择",
        },
        {
          type: "Input",
          label: "证件号码",
          prop: "idnnumber",
          width: "200px",
          placeholder: "请输入内容",
        },
        {
          type: "Select",
          label: "最高学历",
          prop: "highesteducation",
          width: "220px",
          options: highesteducations,
          props: propsSelect,
          change: (row) => "",
          placeholder: "请选择",
        },
        {
          type: "Input",
          label: "联系电话",
          prop: "phone",
          width: "500px",
          placeholder: "请输入内容",
        },
      ],
      typetext: "text",
      isSearch: true,
      Rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      // 新增 - 新增角色
      addSearchData: {
        name: null,

        age: null,

        sex: null,

        date: "",
      },
      addFormRef: "inlineForm",
      addSearchForm: [
        {
          type: "Input",
          label: "岗位1",
          prop: "station",
          width: "200px",
          disabled: false,
          placeholder: "请输入内容",
        },
        {
          type: "Inputinquire",
          label: "角色1",
          prop: "role",
          width: "100px",
          placeholder: "请输入内容",
          labels: "搜索",
          icon: "el-icon-search",
          typestyle: "primary",
          quirele: () => this.go(),
        },
      ],
    };
  },
    created() {
    this.getUserList()
  },
  methods: {
    getUserList(){
      let param = {   
          "Header":{
              "SourceSysId": "1", 
              "ConsumerId": "1", 
              "ServiceCode": "1", 
              "TranCode": "1", 
              "GlobalSeq": "1", 
              "TranSeq": "1", 
              "Channel": "1", 
              "BranchId": "1", 
              "TranTeller": "100001", 
              "AuthFlag": "1", 
              "TranDate": "20180821", 
              "TranTime": "230651354", 
              "LocalLang": "1", 
              "LegalRepCode": "1", 
              "PageStart": "0",
              "PageEnd": "1",
              "TotalNum": "10"
          },
          "orgId":"800000",
          "pageNum": "1",
          "pageSize": "10"
      }
      queryUserList(param).then(response => {
        let tableData = response;
        this.listLoading = false
      })
    },
    getIndex(e) {
      console.log("e", e);
      if (e.operate.id === "1") {
        this.isShow = true;
        this.text = "修改";
        this.editSearchForm[0].disabled = true;
      } else if (e.operate.id === "2") {
      } else if (e.operate.id === "3") {
      }
    },
    go() {
      console.log("hahahahha");
    },
    addSubmit() {
      // this.isShow = true;
      // this.text = "新增";
      // this.editSearchForm[0].disabled = false;
      this.$router.push('/system-management/user-add')

    },
    //新增岗位角色
    addrole() {
      const addmus = this.addSearchForm;
      this.addSearchForm = concat(addmus, adddata);

      console.log("数据", addSearchForm);
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
    getdialogVisible(flag) {
      if (flag) {
      }
      this.isShow = false;
    },
  },
};
</script>

<style scoped>
.demo-form-inline {
  margin: 0 200px;
}
.but {
  height: 100%;
  width: 100%;
  align-content: center;
  margin: 20px;
}
.til {
  margin: 20px;
  font-size: 18px;
}
.formtxet {
  font-size: 15px;
  font-weight: 400;
  margin: 10px 0;
}
</style>
