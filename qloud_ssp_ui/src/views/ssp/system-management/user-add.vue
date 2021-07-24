<template>
  <div class="home">
    <el-form ref="form" :model="form" :rules="rules" labelWidth="150px">
      <div class="user-add-caption">
        <P>基本信息</P>
      </div>
      <el-row>
        <el-col :span="8">
          <el-form-item label="人员姓名" prop="name">
            <el-input v-model="form.name" autocomplete="off" :style="{width: width}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="人员编码" prop="coding">
            <el-input v-model="form.coding" autocomplete="off" :style="{width: width}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="登录用户名" prop="user">
            <el-input v-model="form.user" autocomplete="off" :style="{width: width}"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="用户类型" prop="userType">
            <el-input v-model="form.userType" autocomplete="off" :style="{width: width}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属机构" prop="organization">
            <el-input v-model="form.organization" autocomplete="off" :style="{width: width}">
              <el-button slot="append" type="primary" @click="organizationquire">搜索</el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邮件地址" prop="idnumber">
            <el-input v-model="form.idnumber" autocomplete="off" :style="{width: width}"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="密码策略" prop="tactics">
            <el-input v-model="form.tactics" autocomplete="off" :style="{width: width}">
              <el-button slot="append" type="primary" @click="codeel">搜索</el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性别" prop="sex">
            <el-select clearable v-model="form.sex" :style="{width: width}" placeholder="请选择帮助类型">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邮件地址" prop="brthdate">
            <el-date-picker v-model="form.brthdate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="证件类型" prop="idtypes">
            <el-select
              clearable
              v-model="form.idtypes"
              :style="{width: width}"
              placeholder="请选择帮助类型"
            >
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="证件号码" prop="email">
            <el-input v-model="form.email" autocomplete="off" :style="{width: width}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="最高学历" prop="highesteducations">
            <el-select
              clearable
              v-model="form.highesteducations"
              :style="{width: width}"
              placeholder="请选择帮助类型"
            >
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="联系电话" prop="suitIntro">
        <el-input v-model="form.suitIntro" autocomplete="off" :style="{width: widths}"></el-input>
      </el-form-item>
      <div class="user-add-caption">
        <p>岗位角色信息</p>
        <el-button type="primary" @click="addRole">新增岗位角色</el-button>
      </div>
      <el-row v-for="(role,index) in form.roles" v-bind:key="index">
        <el-col :span="8">
          <el-form-item :label="`岗位${ index + 1 }`" prop="suitIntro">
            <el-input v-model="role.suitIntro" autocomplete="off" :style="{width: width}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="`角色${ index + 1 }`" prop="tactics">
            <el-input v-model="role.tactics" autocomplete="off" :style="{width: width}">
              <el-button slot="append" type="primary" @click="rolele">搜索</el-button>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="delSubmit(index)">删除</el-button>
        </el-col>
      </el-row>
      <!-- <div v-show="addIsShow">
        <el-row>
          <el-col :span="8">
            <el-form-item label="岗位2" prop="brthdate">
              <el-input v-model="form.suitIntro" autocomplete="off" :style="{width: width}"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="角色2" prop="tactics">
              <el-input v-model="form.tactics" autocomplete="off" :style="{width: width}">
                <el-button slot="append" type="primary" @click="rolele">搜索</el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" @click="delSubmit">删除</el-button>
          </el-col>
        </el-row>
      </div>-->
      <el-row>
        <el-col :span="17">
          <el-form-item></el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item>
            <el-button type="primary" @click="addRole">确定</el-button>
            <!-- <el-button type="primary" @click="reset('form')" style="margin-right: 10px;">重置</el-button> -->
            <el-button @click="getback">返回</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 弹出层 所属机构 -->
    <div>
      <!-- <popup
        :isShow="isShow"
        :size="size"
        :footerList="footerList"
        v-on:senddialogVisible="getdialogVisible"
      >-->
      <el-dialog :visible.sync="dialogFormVisible1">
        <el-dialog :visible.sync="dialogFormVisible1">
          <div slot="title" class="formtxet">
            <P>组织机构</P>
            <el-input v-model="filterText" autocomplete="off" :style="{width: '260px'}">
              <el-button slot="append" type="primary" @click="find">搜索</el-button>
            </el-input>
          </div>
          <template>
            <el-tree
              class="filter-tree"
              :data="treeData"
              :props="defaultProps"
              default-expand-all
              :filter-node-method="filterNode"
              ref="tree"
            ></el-tree>
          </template>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible1 = false">取 消</el-button>
            <el-button type="primary">确 定</el-button>
          </div>
        </el-dialog>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </div>
      </el-dialog>
      <!-- </popup> -->
    </div>
    <!-- 弹出层 密码策略 -->
    <div>
      <popup
        :isShow="codeisShow"
        :title="codetext"
        :size="codesize"
        :footerList="codefooterList"
        v-on:senddialogVisible="codegetdialogVisible"
      >
        <template slot="content">
          <div>
            <form-view
              labelWidth="90px"
              :searchData="searchData"
              :rules="codeRules"
              ref="form"
              :formRef="formRef"
              :searchForm="searchForm"
              :searchHandle="searchHandle"
            ></form-view>
          </div>
          <div class="g-table">
            <tableView
              :showOverflowTooltip="codetableData.showOverflowTooltip"
              :tableHeaderData="codetableData.paramTableHeader"
              :tableData="codetableData.paramData"
              :isPage="codetableData.isPage"
            />
          </div>
        </template>
      </popup>
    </div>
    <!-- 弹出层 角色名称-->
    <el-dialog :visible.sync="dialogFormVisible">
      <div>
        <form-view
          labelWidth="90px"
          :searchData="searchData"
          ref="form"
          :formRef="formRef"
          :searchForm="searchForm"
          :searchHandle="searchHandle"
        ></form-view>
      </div>
      <el-row>
        <el-col :span="24">
          <el-tabs v-model="activeName">
            <el-tab-pane label="岗内角色" name="group">
              <div class="g-table">
                <tableView
                  :showOverflowTooltip="innertableData.showOverflowTooltip"
                  :tableHeaderData="innertableData.paramTableHeader"
                  :tableData="innertableData.paramData"
                  :isPage="innertableData.isPage"
                />
              </div>
            </el-tab-pane>
            <el-tab-pane label="岗外角色" name="share">
              <div class="g-table">
                <tableView
                  :showOverflowTooltip="outertableData.showOverflowTooltip"
                  :tableHeaderData="outertableData.paramTableHeader"
                  :tableData="outertableData.paramData"
                  :isPage="outertableData.isPage"
                />
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style scoped>
.user-add-caption,
p {
  margin: 30px;
  font-size: 15px;
  font-weight: 700;
}
.user-add-caption p,
.formtxet p {
  display: inline;
  margin-right: 60px;
}

.formtxet p {
  margin-right: 350px;
}

nav ul {
  overflow: hidden;
}

nav ul li {
  float: left;
  width: 100px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-right: 1px solid #ccc;
  position: relative;
}

nav ul li.liactive {
  border-bottom: 2px solid #fff;
  z-index: 9;
}
</style>

<script>
export default {
  name: "Home",
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      tableData: [],
      emptyRole: {
        suitIntro: "",
        tactics: "",
      },
      form: {
        name: "",
        coding: "",
        user: "",
        userType: "",
        organization: "",
        email: "",
        tactics: "",
        sex: "",
        id: "",
        brthdate: "",
        roles: [],
      },
      width: "220px",
      widths: "77em",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      brthdate: "",
      options1: [
        { value: "1", lable: "男" },
        { value: "2", lable: "女" },
      ],
      options2: [
        { value: "1", lable: "身份证" },
        { value: "2", lable: "港澳通行证" },
      ],
      options3: [
        { value: "1", lable: "本科" },
        { value: "2", lable: "大专" },
      ],
      rules: {
        title: [
          {
            required: true,
            message: "必填项",
          },
        ],
        photo: [
          {
            required: true,
            message: "必填项",
          },
        ],
        suitIntro: [
          {
            required: true,
            message: "必填项",
          },
        ],
        attention: [
          {
            required: true,
            message: "必填项",
          },
        ],
        strategyType: [
          {
            required: true,
            message: "必填项",
          },
        ],
      },
      formLabelWidth: "80px",
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
          label: "岗位名称",
          prop: "stationname",
          width: "230px",
          placeholder: "请输入姓名",
        },
      ],
      codeRules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      //密码
      // 弹窗部分数据
      codeisShow: false,
      codesize: "medium",
      codetext: "策略编码",
      codefooterList: [
        { name: "取消", type: "", isSubmit: false },
        { name: "确定", type: "primary", isSubmit: true },
      ],
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
          label: "岗位名称",
          prop: "stationname",
          width: "230px",
          placeholder: "请输入姓名",
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
        {
          label: "确认",
          type: "primary",
          handle: () => this.resetForm(this.formRef),
        },
      ],
      codetableData: {
        isPage: true,
        operate: {
          width: 200,
          list: ["修改", "删除"],
        },
        showOverflowTooltip: false,
        paramTableHeader: [
          { prop: "serial", label: "序号" },
          { prop: "stationcode", label: "岗位编码" },
          { prop: "stationname", label: "港湾名称" },
          { prop: "stationsystem", label: "岗位体系" },
          { prop: "description", label: "描述" },
          { prop: "starttime", label: "创建时间" },
          { prop: "undatatime", label: "更新时间" },
        ],
        paramData: [
          {
            serial: "1",
            stationcode: "023",
            stationname: "用户1",
            stationsystem: "user1",
            description: "描述",
            starttime: "2019-03-24 17:07:54",
            undatatime: "2019-03-24 17:07:54",
            value: "",
          },
          {
            serial: "1",
            stationcode: "023",
            stationname: "用户1",
            stationsystem: "user1",
            description: "描述",
            starttime: "2019-03-24 17:07:54",
            undatatime: "2019-03-24 17:07:54",
            value: "",
          },
          {
            serial: "1",
            stationcode: "023",
            stationname: "用户1",
            stationsystem: "user1",
            description: "描述",
            starttime: "2019-03-24 17:07:54",
            undatatime: "2019-03-24 17:07:54",
            value: "",
          },
        ],
      },
      //弹出层部分- 角色名称
      dialogFormVisible: false,
      outerShow: false,
      innerShow: true,
      activeName: "second",
      roleisShow: false,
      rolesize: "small",
      roletext: "角色名称",
      rolefooterList: [
        { name: "取消", type: "", isSubmit: false },
        { name: "确定", type: "primary", isSubmit: true },
      ],
      innertableData: {
        isPage: true,
        operate: {
          width: 200,
          list: ["修改", "删除"],
        },
        showOverflowTooltip: false,
        paramTableHeader: [
          { prop: "serial", label: "序号" },
          { prop: "stationcode", label: "岗位编码" },
          { prop: "stationname", label: "港湾名称" },
        ],
        paramData: [
          {
            serial: "1",
            stationcode: "023",
            stationname: "岗位1",
          },
          {
            serial: "1",
            stationcode: "023",
            stationname: "岗位1",
          },
          {
            serial: "1",
            stationcode: "023",
            stationname: "岗位1",
          },
        ],
      },
      outertableData: {
        isPage: true,
        operate: {
          width: 200,
          list: ["修改", "删除"],
        },
        showOverflowTooltip: false,
        paramTableHeader: [
          { prop: "serial", label: "序号" },
          { prop: "stationcode", label: "岗位编码" },
          { prop: "stationname", label: "港湾名称" },
        ],
        paramData: [
          {
            serial: "1",
            stationcode: "000",
            stationname: "用户1",
          },
          {
            serial: "1",
            stationcode: "000",
            stationname: "用户1",
          },
          {
            serial: "00",
            stationcode: "023",
            stationname: "用户1",
          },
        ],
      },
      //弹出层部分 - 所属机构
      isShow: false,
      size: "small",
      text: "",
      footerList: [
        { name: "取消", type: "", isSubmit: false },
        { name: "确定", type: "primary", isSubmit: true },
      ],
      //tree
      filterText: "",
      treeData: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      // 新增
      addIsShow: false,
    };
  },

  created() {
    this.getAllData();
  },

  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },

  methods: {
    //获取用户数据
    getAllData() {},
    // 用户新增
    addRole() {
      const role = Object.assign({}, this.emptyRole);
      this.form.roles.push(role);
    },

    delSubmit(index) {
      this.form.roles.splice(index, 1);
    },

    organizationquire() {
      this.dialogFormVisible1 = true;
    },

    codeel() {
      this.codeisShow = true;
    },
    rolele() {
      this.dialogFormVisible = true;
    },
    //调用 Tree 实例的filter方法，
    filterNode(value, data) {
      console.log(value, data);
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    find() {
      // this.filterText = ""
    },
    // 所属机构 弹出层关闭
    getdialogVisible(flag) {
      if (flag) {
      }
      this.isShow = false;
    },
    // 密码 弹出层关闭
    codegetdialogVisible(flag) {
      if (flag) {
      }
      this.codeisShow = false;
    },
    // 角色 弹出层关闭

    rolegetdialogVisible(roleflag) {
      if (roleflag) {
      }
      this.roleisShow = false;
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },

    reset(formName) {
      this.$refs[formName].resetFields();
    },
    getback() {
      this.$router.go(-1);
    },
  },
};
</script>