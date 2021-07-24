/*
* @Author: Ray haiyoung
* @Date: 2020-07-23 16:11:27
* @Last Modified by: Ray haiyoung
* @Last Modified time: 2020-07-24 09:16:26
*/
<template>
  <div class="m-table">
    <el-table
      :size="size"
      :height="tableHeight"
      :data="tableData"
      v-loading="loading"
      :span-method="spanMethod"
      tooltip-effect="dark"
      :stripe="isStripe"
      :header-cell-style="headerCellStyle"
      :cell-style="cellStyle"
      :row-style="rowStyle"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange"
      @cell-click="cellClick"
      @row-dblclick="rowDblClick"
      @row-click="rowClick"
      style="width: 100%"
    >
      <!-- 单选列 -->
      <el-table-column
        v-if="isRidio"
        fixed
        width="50"
      >
        <template slot-scope="scope">
          <el-radio
            v-model="radio"
            :label="currentPage.toString() + scope.$index.toString()"
            @change.native="getSelected(scope.row)"
          >{{" "}}
          </el-radio>
        </template>
      </el-table-column>
      <!-- 多选列  -->
      <el-table-column
        fixed
        type="selection"
        v-if="isCheckbox"
        width="55"
      ></el-table-column>
      <!-- 序号列 -->
      <el-table-column
        fixed
        type="index"
        width="50"
        :label="$t('public.order')"
        v-if="isOrder"
        :index.sync="indexMethod"
      ></el-table-column>
      <!-- 表头列 -->
      <el-table-column
        v-for="(tHeaderItem, index) in tableHeaderData"
        :sortable="tHeaderItem.sortable ? 'custom' : false"
        :fixed="tHeaderItem.fixed ? true : false"
        :show-overflow-tooltip="tHeaderItem.showOverflowTooltip ? true : false"
        :key="index"
        :align="tHeaderItem.align ? tHeaderItem.align : 'center'"
        :prop="tHeaderItem.prop"
        :label="tHeaderItem.label"
        :width="tHeaderItem.width !== '' ? tHeaderItem.width : '180'"
      >
        <!-- 使用format方法处理传入数据-->
        <template slot-scope="scope">
          <div v-if="isInclude(tHeaderItem, 'format') && isFunction(tHeaderItem.format)" v-html="tHeaderItem.format(scope.row[tHeaderItem.prop])"></div>
          <span v-else>{{scope.row[tHeaderItem.prop]}}</span>
        </template>
      </el-table-column>
      <!-- 操作列start -->
      <el-table-column
        v-if="operateObj.list.length !== 0"
        fixed="right"
        label="操作"
        :width="operateObj.width"
        :formatter="handleformatter"
      >
        <template slot-scope="scope">
          <div
            class="operate"
          >
            <a
              class="p12 c6"
              v-for="(item, index) in operateObj.list.slice(0, 2)"
              :key="item.id"
              @click="operate(scope.$index,scope.row,item)"
              :title="item.label"
              href="javascript:;"
            >
              {{item.label}}
            </a>
            <el-dropdown
              v-if="operateObj.list.length>2">
              <a class="p12 c6">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </a>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :key="item.id"
                  @click.native="() => {
                    operate(scope.$index, scope.row, item)
                  }"
                  v-for="(item, index) in operateObj.list"
                >{{item.label}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </template>
      </el-table-column>
      <!-- 操作列end -->
    </el-table>
    <!-- 分页 -->
    <div
      class="page"
      v-if="isPage"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :pager-count="pagerCount"
        :page-sizes="pageSizes"
        :layout="pageLayout"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
  import variables from '@/styles/variables.scss'
  import { isType, isInclude } from '@/utils'

  export default {
    name: 'tableView',
    data() {
      return {
        radio: '',
        //表格高度
        tableHeight: '',
        //表头单元格设置Style
        headerCellStyle: {
          color: variables.$tableColor,
          fontWeight: '400',
          backgroundColor: variables.$tableHeaderBackgroundColor,
          borderTop: `1px solid ${variables.$tableBorderTop}`,
          textAlign: 'center'
        },
        //为所有单元格设置Style
        cellStyle: {
          textAlign: 'center'
        },
        isInclude: (data, key) => {
          return isInclude(data, key)
        },
        isFunction: (val) => {
          return isType.isFunction(val)
        }
      }
    },

    props: {
      //是否显示loading
      loading: {
        type: Boolean,
        default: false
      },
      //是否带边框
      isBorder: {
        type: Boolean,
        default: false
      },
      //是否带斑马纹
      isStripe: {
        type: Boolean,
        default: true
      },
      //Table 的尺寸
      size: {
        type: String,
        default: 'mini',
        validator(type) {
          if (type && !['medium', 'small', 'mini'].includes(type)) {
            console.error(
              'type类型必须为:' + ['medium', 'small', 'mini'].join('、')
            )
          }
          return true
        }
      },
      // 是否显示序号
      isOrder: {
        type: Boolean,
        default: true
      },
      //是否合并单元格
      isSpanMethod: {
        type: Boolean,
        default: false
      },
      //是否有操作列
      operateObj: {
        type: Object,
        default: () => {
          return {
            width: {
              type: Number,
              default: 200
            },
            list: []
          }
        }
        /**
         * operateObj:{
  				width:200,
  				list:[{name:"",id:""},{name:"",id:""}]
  			},
         */
      },
      //是否单选
      isRidio: {
        type: Boolean,
        default: false
      },
      //是否多选
      isCheckbox: {
        type: Boolean,
        default: false
      },
      //是否点击
      isClick: {
        type: Boolean,
        default: false
      },
      //表头数据
      tableHeaderData: {
        type: Array,
        default: function() {
          return [
            {
              prop: '',
              label: '',
              //是否需要排序
              sortable: {
                type: Boolean,
                default: false
              },
              //是否需要固定
              fixed: {
                type: Boolean,
                default: false
              }
            }
          ]
        }
      },
      //表数据
      tableData: {
        type: Array,
        default: () => []
      },
      //是否有分页
      isPage: {
        type: Boolean,
        default: false
      },
      //当前页
      currentPage: {
        type: Number,
        default: 100
      },
      //总条数
      total: {
        type: Number,
        default: 10000
      },
      //每条页数
      pageSize: {
        type: Number,
        default: 10
      }
    },

    computed: {
      // 分页组件每页显示条数
      pageSizes() {
        return this.$store.state.settings.pageSizes
      },
      // 分页layout配置
      pageLayout() {
        return this.$store.state.settings.pageLayout
      },
      // 分页页码按钮的数量
      pagerCount() {
        return this.$store.state.settings.pagerCount
      }
    },

    watch: {
      //监听表内容的数据  动态计算table高度
      tableData: {
        handler(newArr, oldArr) {
          const $self = this
          if ($self.isPage) {
            $self.tableHeight = 'calc(100% - 54px)'
          } else {
            $self.tableHeight = '100%'
          }
        },
        deep: true,
        immediate: true
      }
    },

    methods: {
      //排序函数
      sortChange(column, prop, order) {
        if (column.order === null || column.order === undefined) return
        console.log(column)
        console.log(column.prop + '-' + column.order)
        this.$emit('getChildprop', column.prop)
      },

      //自定义索引
      indexMethod(index) {
        return (this.currentPage - 1) * this.pageSize + (index + 1)
      },

      //多选事件
      handleSelectionChange(val) {
        this.$emit('getChildSelectionList', val)
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        //将页码发送给父组件  父组件发送请求给后台  重新获取数据
        this.$emit('getPageSize', val)
      },

      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        //将页码发送给父组件  父组件发送请求给后台  重新获取数据
        this.$emit('getPage', val)
      },

      /**
       * @Descripttion 操作列事件方法
       * @param index当前列的下标
       * @param param当前列的数据
       * @param operate 具体被操作元素的数据，
       *
       */
      operate(index, param, operate) {
        console.log(index, param, operate)
        this.$emit('operate', {
          index: index,
          row: param,
          operate: operate
        })
      },

      //单选点击事件
      getSelected(data) {
        this.$emit('getRadioSelected', data)
      },

      // 合并单元格
      spanMethod({ row, column, rowIndex, columnIndex }) {
        if (this.isSpanMethod) {
          return this.$parent.spanMethod({ row, column, rowIndex, columnIndex })
        }
      },

      rowStyle: function() {
        // 如果此行能点击，则添加小手样式
        if (this.isClick) {
          return {
            cursor: 'pointer'
          }
        }
      },

      //格式化内容方法
      handleformatter(row, column, cellValue, index) {
        console.log(row)
      },

      //当某个单元格被点击时会触发该事件
      cellClick(row, column, cell, event) {
        if (this.isClick && this.isRidio) {
          this.radio = row.order - 1
          this.$emit('getChildcur', row.order - 1)
        } else if (this.isClick && !this.isRidio) {
          this.$emit('getChildIndex', row.order - 1)
        }
      },

      // 当某一行被点击时会触发该事件
      rowClick(row, column, event) {
        let data = {
          row: row.order - 1,
          column: column
        }
        this.$emit('getClickdata', data)
      },

      //当某一行被点击时会触发该事件
      rowDblClick(row, column, event) {
        let data = {
          row: row.order - 1,
          column: column
        }
        this.$emit('getDbldata', data)
      }
    }
  }
</script>
<style scoped="scoped" lang="scss">
  .m-table {
    box-sizing: border-box;
    background-color: #fff;
    height: 100%;
    overflow: hidden;

    div.operate {
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;

      a, .el-dropdown > a {

        & ~ a, & ~ .el-dropdown {
          margin-left: 5px;
        }

        display: inline-block;
        padding: 0 5px;
        border: 1px solid #d1d1d1;

        &:hover {
          border-color: #75b2e6;
          color: #32aaef;
        }
      }
    }

    .page {
      box-sizing: border-box;
      background-color: #fff;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      padding: 10px 20px 0 20px;
    }
  }
</style>
