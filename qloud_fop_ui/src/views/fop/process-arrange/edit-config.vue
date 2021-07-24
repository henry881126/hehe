/*
 * @Author: ui_qianhengli 
 * @Date: 2020-08-02 11:20:40 
 * @Last Modified by:   ui_qianhengli 
 * @Last Modified time: 2020-08-02 11:20:40 
 */


<template>
  <div class="vue">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="新增节点" name="first1">新增节点</el-tab-pane>
      <el-tab-pane label="修改节点" name="first2">修改节点</el-tab-pane>
      <el-tab-pane label="删除节点" name="first3">删除节点</el-tab-pane>
    </el-tabs>
  </div>
</template>
 
<script>
export default {
  name: 'edit-tree',
  data() {
    return {
      activeName: 'first1',
    }
  },
  methods: {
    handleClick(val) {
      console.log(val)
    },
  },
}
</script>
 
<style scoped lang = "sass">
 
</style>