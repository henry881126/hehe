<template>
  <div class="home">
    <div class="til">
      <p>{{ $t('common.operate.searchConditions') }}</p>
    </div>
    <div>
      <form-view
        labelWidth="90px"
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
        :current-page="searchData.Header.CurrentPageNum"
        :isPage="tableData.isPage"
        :total="tableData.total"
        @getPage="currentPageChange"
        @getPageSize="currentSizeChange"
        v-on:operate="getIndex"
      />
    </div>

    <!-- 弹出层 -->
    <div>
      <popup :isShow="isShow" :title="text" :size="size" v-on:senddialogVisible="getdialogVisible">
        <template slot="content">
          <form-view
            labelWidth="80px"
            :searchData="editSearchData"
            :rules="Rules"
            :isInline="false"
            ref="editform"
            :formRef="editFormRef"
            :searchForm="editSearchForm"
            :searchHandle="editSearchHandle"
          ></form-view>
        </template>
      </popup>
    </div>
  </div>
</template>

<script>
import {
  queryStationList,
  addStationSubmit,
  updateStation,
  deleteStation
} from "@/api/ssp/system-management/station";
import { queryCommonParamList } from "@/api/ssp/common";
import { getPlaceholderMsg, getPlaceholderMsgForSelect } from "@/utils/i18Util";
import { isType, isInclude } from "@/utils";

let sexProps = { label: "paramName", value: "paramValue" };
export default {
  name: "Home",
  data() {
    return {
      searchData: {
        postName: null,

        postId: null,

        postFrame: null,

        Header: {
          PageTotalNum: 10, // 每页显示数据条数
          CurrentPageNum: 1, // 当前第几页
        },
      },
      //
      paramGroup: {
        paramGroupId: "100006",
      },
      formRef: "inlineForm",
      searchForm: [
        {
          type: "Input",
          label: this.$t('sysManage.postName'),
          prop: "postName",
          width: "230px",
          placeholder: getPlaceholderMsg(this.$t('sysManage.postName')),
        },

        {
          type: "Input",
          label: this.$t('sysManage.postId'),
          prop: "postId",
          width: "230px",
          placeholder: getPlaceholderMsg(this.$t('sysManage.postId')),
        },
        {
          type: "Select",
          label: this.$t('sysManage.postFrame'),
          prop: "postFrame",
          width: "230px",
          options: [],
          props: sexProps,
          change: (index) => "",
          placeholder: "请选择岗位体系统",
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
          label: this.$t('common.operate.search'),
          type: "primary",
          handle: () => this.searchHandleForm(this.formRef),
        },

        {
          label: this.$t('common.operate.reset'),
          type: "primary",
          handle: () => this.resetForm(this.formRef),
        },
        {
          label: "高级搜索",
          type: "primary",
          handle: () => this.resetForm(this.formRef),
        },
      ],
      tableData: {
        isPage: true,
        operate: {
          width: 200,
          list: [ {label: this.$t('common.operate.edit'),id: "1"}, {label: this.$t('common.operate.delete'),id: "2"}],
        },
        showOverflowTooltip: false,
        paramTableHeader: [
          { prop: "postId", label: this.$t('sysManage.postId') },
          { prop: "postName", label: this.$t('sysManage.postName') },
          { prop: "postFrame", label: this.$t('sysManage.postFrame') },          
          { prop: "description", label: this.$t('sysManage.description') },
          { prop: "createdTxStamp", label: this.$t('sysManage.createdTxStamp') },
          { prop: "lastUpdatedStamp", label: this.$t('sysManage.lastUpdatedStamp') },
        ],
        paramData: [],
      },

      // 弹窗部分数据
      isShow: false,
      size: "small",
      text: "",
      editSearchData: {
        postName: null,

        postId: null,

        postFrame: null,

        description: null,
      },
      editFormRef: "inlineForm",
      editSearchHandle: [
        {
          label: this.$t('common.operate.confirm'),
          type: "primary",
          handle: () => this.editSearchHandleForm(this.formRef),
        },

        {
          label: this.$t('common.operate.cancel'),
          type: "",
          handle: () => this.editresetForm(this.formRef),
        },
      ],
      editSearchForm: [
        {
          type: "Input",
          label: this.$t('sysManage.postName'),
          prop: "postName",
          width: "220px",
          disabled: false,
          placeholder: getPlaceholderMsg(this.$t('sysManage.postName')),
        },

        {
          type: "Input",
          label: this.$t('sysManage.postId'),
          prop: "postId",
          width: "220px",
          placeholder: getPlaceholderMsg(this.$t('sysManage.postId')),
        },
        {
          type: "Select",
          label: this.$t('sysManage.postFrame'),
          prop: "postFrame",
          width: "220px",
          options: [],
          props: sexProps,
          change: (value) => this.changeProps(value),
        },
        {
          type: "Input",
          label: this.$t('sysManage.description'),
          prop: "description",
          width: "220px",
          placeholder: getPlaceholderMsg(this.$t('sysManage.description')),
        },        
      ],
      typetext: "text",
      Rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
    this.typeList();
  },
  methods: {
    getIndex(e) {
      if (e.operate.id === 1) {
        console.log("e", e);
        this.isShow = true;
        this.editSearchData = Object.assign(e.row)
        this.text = "修改";
        this.editSearchForm[0].disabled = true;
      } else if (e.operate.id === 2) {
        this.deleteStation(e.row)
      } 
    },
    getList() {
      //列表
      console.log('列表this.searchData',this.searchData)
      queryStationList(this.searchData).then((response) => {
        console.log("response--", response);
        this.tableData.paramData = response.postInfoList;
        this.$set(this.tableData, "total", Number(response.Header.TotalNum));
        //this.total = parseInt(response.Header.TotalNum)
        //this.listLoading = false
      });
    },
    //枚举类型
    typeList() {
      queryCommonParamList(this.paramGroup).then((response) => {
        this.searchForm.map((item) => {
          if (item.type === "Select") {
            item.options = response.list.map((v) => {
              v.label = v.paramName;
              v.value = v.paramValue;
              return v;
            });
          }
          return item;
        });
        this.editSearchForm.map((item) => {
          if (item.type === "Select") {
            item.options = response.list.map((v) => {
              v.label = v.paramName;
              v.value = v.paramValue;
              console.log("v", v);
              return v;
            });
          }
          console.log("item", item);
          return item;
        });
        console.log("this.editSearchForm", this.editSearchForm.options);
      });
    },
    updateStation(formName) {
      console.log("修改this.editSearchData",this.editSearchData)
      updateStation(this.editSearchData).then((response) => {
        console.log("response", response);
        this.$refs["editform"].$refs[formName].resetFields()
        this.$nextTick(() => {
          this.isShow = false
          this.getList()
        })             
      });
    },
    addStation(formName) {
      console.log("this.editSearchData", this.editSearchData);
      addStationSubmit(this.editSearchData).then((response) => {
        console.log("response", response);
        this.$refs["editform"].$refs[formName].resetFields()
        this.$nextTick(() => {
          this.isShow = false
          this.getList()
        })        
      });
    },
    changeProps(value) {
      let obj = this.editSearchForm[2].options.find((item) => {
        return item.value === value; //筛选出匹配数据
      });
      this.editSearchData.postFrame = obj.value;
    },
    // 新增
    addSubmit() {
      this.text = "新增";
      this.isShow = !this.isShow;
      this.editSearchForm[0].disabled = false;
      //this.$refs["editform"].$refs[formName].resetFields()
    },
    getdialogVisible(flag) {
      console.log("flag", flag, typeof flag);
      if (typeof flag === "boolean" && flag === true) {
      } else {
        this.isShow = false;
      }
    },
    currentPageChange(page) {
      console.log("page",page)
      this.searchData.Header.CurrentPageNum = page;
      this.getList()
    },
    // 每页显示条数改变
    currentSizeChange(size) {
      console.log("size",size)
      this.searchData.Header.PageTotalNum = size;
      this.getList()
    },

    // 删除场景项
    deleteStation(data) {
      this.$confirm(`此操作将删除场景"${data.postName}", 是否继续?`, '提示', {
        confirmButtonText: this.$t('common.operate.confirm'),
        cancelButtonText: this.$t('common.operate.cancel'),
        type: 'warning'
      }).then(() => {
        const reqData = {
          postId: data.postId,
        };
        deleteStation(reqData).then(response => {
          this.getList();
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
      });
    },    

    async editSearchHandleForm(formName) {
      console.log(this.text)
      console.log("formName",formName);
      await this.$refs["editform"].$refs[formName].validate((valid) => {
            if (valid) {
            console.log("valid", valid);
            if(this.text === "新增"){
              this.addStation(formName);             
            } else if (this.text === "修改"){
              this.updateStation(formName)
            }
          } else {
            console.log("error submit!!");
            return false;
          }
     
      });   
    },

    async editresetForm(formName) {
      await this.$refs["editform"].$refs[formName].resetFields();
      this.isShow = !this.isShow
    },
   
    async resetForm(formName) {
      await this.$refs["form"].$refs[formName].resetFields();
    },
    async searchHandleForm(formName) {
      // console.log("searchHandle");
      await this.$refs["form"].$refs[formName].validate((valid) => {
        if (valid) {
          this.searchData.Header.CurrentPageNum = 1;
          this.getList();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
.g-table {
  height: calc(100vh - 370px);
}
</style>
