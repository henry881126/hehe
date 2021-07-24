/*
 * @Descripttion:
 * @version:
 * @Author: tangpingying
 * @Date: 2020-07-28 09:21:25
 * @LastEditors: Ray Haiyoung
 * @LastEditTime: 2020-08-04 11:51:47
 */
import Layout from "@/layout";
export default [
  {
    path: "/Layout",
    name: "Layout",
    component: Layout,
    redirect: "/Layout/Home",
    meta: {
      title: "首页",
      icon: "user",
    },
    children: [
      {
        path: "/Layout/Home",
        name: "Home",
        component: () => import("@/views/Home.vue"),
        meta: {
          title: "机构IP",
          icon: "",
        },
      },
    ],
  },
];
