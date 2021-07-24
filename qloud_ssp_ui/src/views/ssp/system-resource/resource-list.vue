<!--
 * @Descripttion:
 * @version:
 * @Author: zhanghuan
 * @Date: 2020-07-29 11:09:35
 * @LastEditors: zhanghuan
 * @LastEditTime: 2020-08-01 11:09:35
-->
<template>
  <div class="resource-list">
    <p class="condition-title">{{ $t('common.operate.searchConditions') }}</p>
    <!-- 检索表单 -->
    <form-view
      labelWidth="80px"
      :searchData="searchData"
      ref="searchForm"
      :searchForm="searchForm"
      :searchHandle="searchHandle"
    ></form-view>
    <div class="button-wrapper">
      <el-button type="primary" @click="addScene">{{$t("common.operate.add")}}</el-button>
    </div>
    <div class="g-table">
      <tableView
        :loading="tableData.loading"
        :showOverflowTooltip="tableData.showOverflowTooltip"
        :operateObj="tableData.operate"
        :tableHeaderData="tableData.paramTableHeader"
        :tableData="tableData.paramData"
        :isPage="tableData.isPage"
        :total="tableData.total"
        :current-page="searchData.Header.CurrentPageNum"
        @getPage="currentPageChange"
        @getPageSize="currentSizeChange"
        v-on:operate="getIndex"
      />
    </div>
  </div>
</template>
<script>
  import { queryWebAppSourcePermission, deleteWebAppSource } from '@/api/ssp/system-resource/resource'
  import { isInclude, isType } from '@/utils'
  import { getPlaceholderMsg, getPlaceholderMsgForSelect } from "@/utils/i18Util";

  export default {
    data() {
      return {
        // 检索数据
        searchData: {
          Header: {
            PageTotalNum: 10, // 每页显示数据条数
            CurrentPageNum: 1 // 当前第几页
          }
        },
        total: 0,
        // 检索项
        searchForm: [
          {
            type: 'Input',
            label: this.$t("system_resource.resource.sourceId"),
            prop: 'sourceId',
            width: '220px',
            placeholder: getPlaceholderMsg(this.$t("system_resource.resource.sourceId"))
          },
          {
            type: 'Input',
            label: this.$t("system_resource.resource.sourceName"),
            prop: 'sourceName',
            width: '220px',
            placeholder: getPlaceholderMsg(this.$t("system_resource.resource.sourceName"))
          },
          {
            type: 'Input',
            label: this.$t("system_resource.resource.menuId"),
            prop: 'menuId',
            width: '220px',
            placeholder: getPlaceholderMsg(this.$t("system_resource.resource.menuId"))
          },
          {
            type: 'Input',
            label: this.$t("system_resource.resource.menuName"),
            prop: 'menuName',
            width: '220px',
            placeholder: getPlaceholderMsg(this.$t("system_resource.resource.menuName"))
          },
          {
            type: 'Input',
            label: this.$t("system_resource.resource.permissionId"),
            prop: 'permissionId',
            width: '220px',
            placeholder: getPlaceholderMsg(this.$t("system_resource.resource.permissionId"))
          },
          {
            type: 'Input',
            label: this.$t("system_resource.resource.permissionsName"),
            prop: 'permissionsName',
            width: '220px',
            placeholder: getPlaceholderMsg(this.$t("system_resource.resource.permissionsName"))
          }
        ],
        // 检索项事件
        searchHandle: [
          {
            label: this.$t("common.operate.search"),
            loading: false,
            id: 'search',
            type: 'primary',
            handle: () => this.searchHandleForm('searchForm')
          },
          {
            label: this.$t("common.operate.reset"),
            type: 'primary',
            id: 'reset',
            handle: () => this.resetForm('searchForm')
          },
          {
            label: this.$t("common.operate.advancedSearch"),
            type: 'primary',
            id: 'reset',
            handle: () => this.resetForm('searchForm')
          }
        ],
        tableData: {
          isPage: true,
          isOrder: true,
          loading: false,
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
              }
            ]
          },
          showOverflowTooltip: true,
          // 表格列表头
          paramTableHeader: [
            { prop: 'sourceId', label: this.$t("system_resource.resource.sourceId") },
            { prop: 'sourceName', label: this.$t("system_resource.resource.sourceName") },
            { prop: 'sourceDescription', label: this.$t("system_resource.resource.sourceDescription") },
            { prop: 'sourceStatus', label: this.$t("system_resource.resource.sourceStatus") },
            { prop: 'menuId', label: this.$t("system_resource.resource.menuId") },
            { prop: 'menuName', label: this.$t("system_resource.resource.menuName") },
            { prop: 'permissionId', label: this.$t("system_resource.resource.permissionId") },
            { prop: 'permissionsName', label: this.$t("system_resource.resource.permissionsName") },
            { prop: 'handlerMethod', label: this.$t("system_resource.resource.handlerMethod") },
            { prop: 'createdStamp', label: this.$t("common.createdStamp") },
            { prop: 'lastUpdatedStamp', label: this.$t("common.lastUpdatedStamp") }
          ],
          paramData: []
        }
      }
    },
    methods: {
      async resetForm(formName) {
        await this.$refs[formName].$refs['inlineForm'].resetFields();
      },

      searchHandleForm(formName) {
        this.$refs[formName].$refs['inlineForm'].validate( async (valid) => {
          if (valid) {
            this.searchData.Header.CurrentPageNum = 1
            this.searchHandle.forEach((item) => {
              if (item.id === 'search') {
                item.loading = true
              }
            })
            await this.getList();
            this.searchHandle.forEach((item) => {
              if (item.id === 'search') {
                item.loading = false
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },

      addScene() {
        this.$router.push({
          name: 'resource-add'
        });
      },

      // 获取资源列表
      getList() {
        this.tableData.loading = true
        return queryWebAppSourcePermission(this.searchData).then(response => {
          if (isInclude(response, 'sourceList') && isType.isArray(response.sourceList)) {
            this.tableData.paramData = response.sourceList;
            this.$set(this.tableData, 'total', Number(response.Header.TotalNum));
          }
          this.tableData.loading = false
        })
      },

      // 删除资源
      deleteScene(data) {
        console.log(data)
        const reqData = {
          sourceId: data.sourceId,
          menuId: data.menuId,
          systemId: data.systemId,
          permissionId: data.permissionId
        };
        deleteWebAppSource(reqData).then(response => {
          this.getList();
        })
        this.$message({
          type: 'success',
          message: `${this.$t("system_resource.prompt.delete_success")}！`
        });
      },

      //获取按钮操作项
      getIndex(e) {
        if (e.operate.id === "modify") {
          // console.log(secure.encryption(e.row))
          this.$router.push({
            name: "resource-modify",
            params: e.row,
          });
        } else if (e.operate.id === "delete") {
          this.$confirm(`${this.$t("system_resource.prompt.deletePrompt")}${e.row.sourceName}, ${this.$t("system_resource.prompt.isContinue")}`, this.$t("system_resource.prompt.prompt"), {
            confirmButtonText: this.$t("common.operate.confirm"),
            cancelButtonText: this.$t("common.operate.cancel"),
            type: 'warning'
          }).then(() => {
            this.deleteScene(e.row);
          }).catch(() => {
          })
        }
      },

      // 页码改变
      currentPageChange(page) {
        this.searchData.Header.CurrentPageNum = page;
        this.getList();
      },

      // 每页显示条数改变
      currentSizeChange(size) {
        this.searchData.Header.PageTotalNum = size;
        this.getList();
      }
    },

    created() {
      this.getList()
      const data = {
        a: 1,
        b: 2
      }
      console.log(isType.isString(123))
      console.log(isType)
      console.log(isInclude(data, "a"))
      console.log(isInclude(data, "c"))
    }
  }
</script>
<style lang="scss" scoped>
  .resource-list {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .condition-title {
    margin: 20px;
    font-size: 18px;
  }

  .button-wrapper {
    margin: 20px;
  }

  .g-table {
    flex: 1;
  }
</style>
