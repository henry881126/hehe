/*
 * @Autor: ui_qianhengli
 * @Date: 2020-08-04 12:40:55
 * @LastEditors: ui_qianhengli
 * @LastEditTime: 2020-08-07 09:26:08
 */
import Layout from "@/layout";
export default [
  {
    path: "/process",
    name: "process",
    component: Layout,
    redirect: "/process/process-model",
    meta: {
      title: "流程编排",
      icon: "user"
    },
    children: [
      {
        path: "/process/process-model",
        name: "ProcessModel",
        // component: () => import("@/views/fop/process-arrange/business-layout.vue"),
        component: () =>
          import("@/views/fop/process-arrange/process-model.vue"),
        meta: {
          title: "流程模型",
          icon: ""
        }
      },
      {
        path: "/process/node-model",
        name: "NodeModel",
        component: () => import("@/views/fop/process-arrange/node-model.vue"),
        meta: {
          title: "节点模型",
          icon: ""
        }
      },
      {
        path: "/process/foreign-model",
        name: "ForeignModel",
        component: () =>
          import("@/views/fop/process-arrange/foreign-server.vue"),
        meta: {
          title: "对外服务",
          icon: ""
        }
      },
      {
        path: "/process/task-trust-do-staff",
        name: "TaskTrustDoStaff",
        component: () =>
          import("@/views/fop/process-arrange/task-trust-do-staff.vue"),
        meta: {
          title: "任务委托待办（员工）",
          icon: ""
        }
      },
      {
        path: "/process/task-trust-do-manage",
        name: "TaskTrustDoManage",
        component: () =>
          import("@/views/fop/process-arrange/task-trust-do-manage.vue"),
        meta: {
          title: "任务委托待办（管理）",
          icon: ""
        }
      },
      {
        path: "/process/generic-param",
        name: "GenericParam",
        component: () =>
          import("@/views/fop/process-arrange/generic-param.vue"),
        meta: {
          title: "基础参数",
          icon: ""
        }
      },
      {
        path: "/process/abnormal-handle",
        name: "AbnormalHandle",
        component: () =>
          import("@/views/fop/process-arrange/abnormal-handle.vue"),
        meta: {
          title: "业务异常处理",
          icon: ""
        }
      }
    ]
  }
];
