<!--
 * @Author: LeiRuiQi
 * @Date: 2020-07-28 11:40:25
 * @LastEditors: LeiRuiQi
 * @LastEditTime: 2020-08-05 17:11:58
--> 
<template>
  <div class="m-tree">
    <el-tree
      :ref="treeRef"
      :class="className"
      :data="treeData"
      :empty-text="emptyText"
      :show-checkbox="showCheckbox"
      :node-key="oneNodeKey"
      :props="defaultProps"
      :check-strictly="checkStrictly"
      :check-on-click-node="checkOnClickNode"
      :highlight-current="highlightCurrent"
      :current-node-key="currentNodeKey"
      :default-expand-all="defaultExpandAll"
      :default-expanded-keys="defaultExpandedKeys"
      :default-checked-keys="defaultCheckedKeys"
      :accordion="accordion"
      :expand-on-click-node="isExpandOnClickNode"
      :icon-class="iconClass"
      @node-click="handleNodeClick"
      @check-change="handleCheckChange"
    ></el-tree>
  </div>
</template>

<script>
export default {
  name: "base-tree",
  props: {
    // ref的值
    treeRef: {
      type: String,
    },
    // 自定义的样式名
    className: {
      type: String,
      default: "",
    },
    // el-tree的渲染数据
    treeData: {
      type: Array,
      default: [],
      validator(arr) {
        if (!Array.isArray(arr)) {
          console.error("treeData只接收数组类型");
        }
        return true;
      },
    },
    // 对el-tree的渲染数据进行属性定义
    defaultProps: {
      type: Object,
      default: () => {
        return {
          children: "children",
          label: "label",
        };
      },
      validator(obj) {
        if (
          !Object.keys(obj).some((even) =>
            "labelchildrendisabledisLeaf".includes(even)
          )
        ) {
          console.error(
            "tree prop对象至少要包含label，children，disabled，isLeaf属性其中之一"
          );
        }
        return true;
      },
    },
    // 内容为空的时候展示的文本
    emptyText: {
      type: String,
    },
    // 节点是否可被选择
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    // 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
    oneNodeKey: {
      type: String,
      default: "id",
    },
    // 是否在点击节点的时候选中节点
    checkOnClickNode: {
      type: Boolean,
      default: false,
    },
    // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法
    checkStrictly: {
      type: Boolean,
      default: false,
    },
    // 是否高亮当前选中节点
    highlightCurrent: {
      type: Boolean,
      default: false,
    },
    // 当前选中的节点
    currentNodeKey: {
      type: String,
    },
    // 是否默认展开所有节点
    defaultExpandAll: {
      type: Boolean,
      default: false,
    },
    // 是否在点击节点的时候展开或者收缩节点。如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。
    isExpandOnClickNode: {
      type: Boolean,
      default: true,
    },
    // 默认展开的节点的 key 的数组
    defaultExpandedKeys: {
      type: Array,
    },
    // 默认勾选的节点的 key 的数组
    defaultCheckedKeys: {
      type: Array,
    },
    // 是否每次只打开一个同级树节点展开
    accordion: {
      type: Boolean,
      default: false,
    },
    // 自定义树节点的图标
    iconClass: {
      type: String,
    },
  },
  methods: {
    // 节点被点击时的回调
    handleNodeClick(data, node, element) {
      this.$emit("nodeClick", { data, node, element });
    },
    // 节点选中状态发生变化时的回调
    handleCheckChange(obj, checked, childrenChecked) {
      this.$emit("checkChange", { obj, checked, childrenChecked });
    },
  },
};
</script>
<style lang='scss' scoped>
.m-tree {
  width: 200px;
  max-width: 200px;
  overflow: auto;
  height: 100%;
  ::v-deep .el-tree {
    color: #333;
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
  ::v-deep .el-tree--highlight-current
    .el-tree-node.is-current
    > .el-tree-node__content {
    color: #0079f5;
  }
}
</style>