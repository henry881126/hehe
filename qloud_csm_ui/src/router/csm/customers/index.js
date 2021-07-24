/*
 * @Descripttion: customers路由
 * @version: 
 * @Author: Ray Haiyoung
 * @Date: 2020-08-04 12:03:00
 * @LastEditors: Ray Haiyoung
 * @LastEditTime: 2020-08-06 11:28:39
 */

import Layout from "@/layout";
export default [
  {
    path: "/Layout",
    name: "Layout",
    component: Layout,
    redirect: "/Layout/customers",
    meta: {
      title: "首页",
      icon: "user",
    },
    children: [
      {
        path: "/Layout/customers",
        name: "customers",
        component: () => import("@/views/csm/customers/customers.vue"),
        meta: {
          title: "我的客群",
          icon: "",
        },
      },
      {
        hidden:true,
        path: "/customer-group-list",
        name: "customer-group-list",
        component: () => import("@/views/csm/customers/customer-group-list"),
        meta: {
          title: "客户视图",
          icon: "",
        },
      },
      {
        hidden:true,
        path: "/add-client-base",
        name: "add-client-base",
        component: () => import("@/views/cms/customers/add-client-base"),
        meta: {
          title: "客户视图",
          icon: "",
        },
      },      
    ],
  },
];
