<!--
 * @Author: LeiRuiQi
 * @Date: 2020-07-28 10:56:23
 * @LastEditors: LeiRuiQi
 * @LastEditTime: 2020-08-05 17:28:07
--> 

<template>
  <div class="business-layout">
    <!-- <el-header height="50px">{{$route.meta.title}}</el-header> -->
    <el-container>
      <div :class="['side-container', {'side-container-line': turnSideTree}]">
        <el-button
          class="business-unfold-btn"
          type="primary"
          :icon="!turnSideTree?'el-icon-s-fold':'el-icon-s-unfold'"
          @click="openSideTree"
        ></el-button>
        <el-aside class="business-layout-aside" width="auto">
          <base-tree
            ref="base-tree"
            :treeRef="treeSchema.ref"
            :class-name="treeSchema.class"
            :tree-data="treeSchema.treeData"
            :current-node-key="treeSchema.currentNodeKey"
            :is-expand-on-click-node="treeSchema.isExpandOnClickNode"
            :default-expand-all="treeSchema.defaultExpandAll"
            :highlight-current="treeSchema.highlightCurrent"
            @nodeClick="nodeClick"
          />
        </el-aside>
      </div>
      <el-main>
        <el-header height="50px">{{ treeTitle }} - {{$route.meta.title}}查询</el-header>
        <slot name="bussiness-main"></slot>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { flowInstanceAllSearch, historyInstanceAllSearch } from "@/api/fop/business-search";
import { isType, isInclude } from "@/utils"

export default {
  name: "business-layout",
  data() {
    return {
      treeTitle: "",
      treeSchema: {
        ref: "business-tree",
        class: "business-tree",
        treeData: [],
        defaultExpandAll: true,
        highlightCurrent: true,
        isExpandOnClickNode: false,
      },
      turnSideTree: true,
      processObj: {
        processFirst: "",
        processSecond: ""
      }
    };
  },
  mounted() {
    // 根据路由变化，请求 tree 数据
    const rpath = this.$route.path;
    if (rpath === "/flow-instance-search") {
      this.flowAllSearch();
    } else if (rpath === "/history-instance-search") {
      this.historyAllSearch();
    }
  },
  methods: {
    /**
     * @description: 点击节点获取数据
     * @param: 点击tree节点获取节点数据 
     * @return: 
     */
    nodeClick({ data }) {
      if (isType.isObject(data) && isInclude(data, "id") && isInclude(data, "label")) {
        const obj = {
          processFirst: "",
          processSecond: ""
        }; 
        if (isInclude(data, "children")) {
          obj.processFirst = data.id;
        } else {
          obj.processSecond = data.id;
        }
        Object.assign(this.processObj, obj);
        this.$emit('processObj', this.processObj);
        this.treeTitle = data.label;
      }
    },

    // tree组件展开/收起
    openSideTree() {
      this.turnSideTree = !this.turnSideTree;
    },

    // 流程实例tree获取
    flowAllSearch() {
      flowInstanceAllSearch({}).then(({result}) => {
        if (Array.isArray(result)) {
          this.treeSchema.treeData = result;
          result.length >= 1 ? this.treeInit() : "";
        }
      });
    },
    /**
     * @description: 历史流程实例tree获取
     * @param:   
     * @return: 
     */
    historyAllSearch() {
      historyInstanceAllSearch({}).then(({ result }) => {
        if (Array.isArray(result)) {
          this.treeSchema.treeData = result;
          result.length >= 1 ? this.treeInit() : "";
        }
      });
    },
    /**
     * @description: 默认获取tree第一个节点的 key值，设置 processFirst
     * @param:   
     * @return: 
     */
    treeInit() {
      this.$nextTick(() => {
        this.$refs["base-tree"].$refs[this.treeSchema.ref].setCurrentKey(
          this.treeSchema.treeData[0].id
        );
        this.processObj.processFirst = this.treeSchema.treeData[0].id;
        this.$emit('processObj', this.processObj);
        this.treeTitle = this.treeSchema.treeData[0].label;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
 .business-layout {
   height: calc(100vh - 80px);
   $business-color-333: #333;
  ::v-deep > .el-container {
    height: 100%;
    .el-header {
      font-size: 14px;
      color: $business-color-333;
      text-align: left;
      line-height: 50px;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    }
    .el-main {
      padding: 1px 1px 1px 0;
    }
    .business-tree {
      color: $business-color-333;
      max-height: 100%;
      height: 100%;
    }
    
    .side-container {
      min-width: 200px;
      max-width: 200px;
      position: relative;
      transition: all 0.5s;
      padding: 10px 10px 0 10px;
      margin-top: 1px;
      box-shadow: 1px 0px 2px 0px rgba(0, 21, 41, 0.08);
    }
    .side-container.side-container-line {
      min-width: 0;
      max-width: 0;
      width: 2px;
      padding: 1px;
    }

    // 展开收起按钮
    .business-unfold-btn {
      padding: 6px 8px;
      position: absolute;
      top: 40px;
      right: -32px;
      z-index: 99;
      transition: all 0.5s;
    }

    .business-layout-aside {
      height: 100%;
      overflow: hidden;
    } 

    // 如果有超长节点会显示横向滚动条
    .el-tree {
      .el-tree-node {
        > .el-tree-node__content {
          min-width: 100%;
          display: inline-block;
          > .el-tree-node__label {
            padding-right: 10px;
            height: 26px;
            line-height: 26px;
            min-width: 100%;
          }
        }
        > .el-tree-node__children {
          overflow: visible;
        }
      }
    }
    .el-tree--highlight-current
      .el-tree-node.is-current
      > .el-tree-node__content {
      color: #0079f5;
    }
  }
}
</style>