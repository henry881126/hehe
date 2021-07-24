<template>
  <div class="home">
    <Title :list="list" />
    <div class="g-table">
      <paramDescription
        :showOverflowTooltip="tableData.showOverflowTooltip"
        :operateObj="tableData.operate"
        :paramTableHeader="tableData.paramTableHeader"
        :paramData="tableData.paramData"
        :isPage="tableData.isPage"
        v-on:operate="getIndex"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      list: [
        { name: "首页", path: "/" },
        { name: "我的", path: "/index" },
        { name: "家族", path: "/home" },
      ],
      tableData: {
        isPage: true,
        operate: {
          width: 200,
          list: ["编辑1", "查看2", "编辑3", "查看4", "编辑5", "查看6"],
        },
        showOverflowTooltip: false,
        paramTableHeader: [
          { prop: "name", label: "过程名称" },
          { prop: "tags", label: "过程标签" },
          { prop: "time", label: "更新时间" },
        ],
        paramData: [
          {
            name: "查看目录",
            tags: "日常巡检",
            time: "2019-03-24 17:07:54",
            value: "",
          },
          {
            name: "查看目录",
            tags: "日常巡检",
            time: "2019-03-24 17:07:54",
            value: "",
          },
          {
            name: "查看目录",
            tags: "日常巡检",
            time: "2019-03-24 17:07:54",
            value: "",
          },
          {
            name: "查看目录",
            tags: "日常巡检",
            time: "2019-03-24 17:07:54",
            value: "",
          },
          {
            name: "查看目录",
            tags: "日常巡检",
            time: "2019-03-24 17:07:54",
            value: "",
          },
        ],
      },
    };
  },
  methods: {
    getIndex(e) {
      console.log(e);
    },
  },
};
</script>
