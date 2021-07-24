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
          <form-view
            labelWidth="80px"
            :searchData="editSearchData"
            :rules="Rules"
            :isInline="false"
            ref="editform"
            :formRef="editFormRef"
            :searchForm="editSearchForm"
          ></form-view>
        </template>
      </popup>
    </div>
    <!-- 权限分配 -->
    <div>
      <popup
        :isShow="allotData.isShow"
        :title="allotData.text"
        :size="allotData.size"
        :footerList="allotData.footerList"
        v-on:senddialogVisible="allotGetdialogVisible"
      >
      <template slot="content">
        <el-tree
          :data="treeData"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="[5]"
          :props="defaultProps"
        ></el-tree>
        </template>
      </popup>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      // form部分数据
      searchData: {
        name: null,

        age: null,

        sex: null,

        date: "",
      },
      formRef: "inlineForm",
      searchForm: [
        {
          type: "Input",
          label: "权限编码",
          prop: "namecode",
          width: "220px",
          placeholder: "请输入内容",
        },

        {
          type: "Input",
          label: "权限名称",
          prop: "jurisdictionname",
          width: "220px",
          placeholder: "请输入内容",
        },

        {
          type: "Input",
          label: "菜单编码",
          prop: "menucode",
          width: "220px",
          placeholder: "请输入内容",
        },
        {
          type: "Input",
          label: "菜单名称",
          prop: "menuname",
          width: "220px",
          placeholder: "请输入内容",
        },
      ],
      Rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
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
      // table部分数据
      tableData: {
        isPage: true,
        operate: {
          width: 200,
          list: [{label:"分配菜单",id: "1"}, {label: this.$t('common.operate.edit'),id: "2"}, {label: this.$t('common.operate.delete'),id: "3"}],
        },
        showOverflowTooltip: false,
        paramTableHeader: [
          { prop: "serial", label: "序号" },
          { prop: "jurisdictioncode", label: "权限编码" },
          { prop: "jurisdictionname", label: "权限名称" },
          { prop: "description", label: "描述" },
          { prop: "starttime", label: "创建时间" },
          { prop: "undatatime", label: "更新时间" },
        ],
        paramData: [
          {
            serial: "1",
            jurisdictioncode: "023",
            jurisdictionname: "权限1",
            falg: "是",
            description: "描述",
            starttime: "2019-03-24 17:07:54",
            undatatime: "2019-03-24 17:07:54",
            value: "",
          },
          {
            serial: "1",
            jurisdictioncode: "023",
            jurisdictionname: "权限1",
            falg: "是",
            description: "描述",
            starttime: "2019-03-24 17:07:54",
            undatatime: "2019-03-24 17:07:54",
            value: "",
          },
          {
            serial: "1",
            jurisdictioncode: "023",
            jurisdictionname: "权限1",
            falg: "是",
            description: "描述",
            starttime: "2019-03-24 17:07:54",
            undatatime: "2019-03-24 17:07:54",
            value: "",
          },
        ],
      },
      // 弹窗部分数据
      isShow: false,
      size: "small",
      text: "",
      footerList: [
        { name: "取消", type: "", isSubmit: false },
        { name: "确定", type: "primary", isSubmit: true },
      ],
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
          label: "权限编码",
          prop: "jurisdictioncode",
          width: "220px",
          disabled: false,
          placeholder: "请输入内容",
        },

        {
          type: "Input",
          label: "权限名称",
          prop: "jurisdictionname",
          width: "220px",
          placeholder: "请输入内容",
        },
        {
          type: "Input",
          label: "菜单名称",
          prop: "menuname",
          width: "220px",
          placeholder: "请输入内容",
          typetext: "textarea",
        },
      ],
      typetext: "text",
      Rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },

      //弹出层 - 权限分配
      allotData: {
        isShow: false,
        size: "small",
        text: "",
        footerList: [
          { name: "取消", type: "", isSubmit: false },
          { name: "确定", type: "primary", isSubmit: true },
        ],
      },
      treeData: [
        {
          id: 1,
          label: "菜单目录",
          children: [
            {
              id: 4,
              label: "用户管理",
            },            
            {
              id: 5,
              label: "机构管理",
              children: [
                {
                  id: 7,
                  label: "机构新增",
                },
                {
                  id: 8,
                  label: "机构删除",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "角色管理",
        },
        {
          id: 3,
          label: "权限管理",
          children: [
            {
              id: 5,
              label: "可以修改",
            },
            {
              id: 6,
              label: "不可以修改",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    getIndex(e) {
      console.log("e", e);
      if (e.operate.id === "1") {
        this.allotData.isShow = true;
        this.allotData.text = "分配页面";        
      } else if (e.operate.id === "2") {
        this.isShow = true;
        this.text = "修改";
        this.editSearchForm[0].disabled = true;
      } else if (e.operate.id === "3") {
      }
    },
    // 新增
    addSubmit() {
      this.isShow = true;
      this.text = "新增";
      this.editSearchForm[0].disabled = false;
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
    allotGetdialogVisible(flag) {
      if (flag) {
      }
      this.allotData.isShow = false;
    },
  },
};
</script>

<style scoped>
.demo-form-inline {
  margin: 0 100px;
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
</style>
