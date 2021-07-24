/*--
 * @Descripttion:
 * @version:
 * @Author: zhanghuan
 * @Date: 2020-08-04 17:31:20
 * @LastEditors: zhanghuan
 * @LastEditTime: 2020-08-04 17:31:20
--*/
export default {
  //场景
  sourceId: '场景编码',
  sourceName: '场景名称',
  description: '描述',
  scene: '场景',

  //资源
  resource: {
    sourceId: "资源编码",
    sourceName: "资源名称",
    menuId: '菜单编码',
    menuName: '菜单名称',
    permissionId: '权限编码',
    permissionsId: '权限编码',
    permissionsName: '权限名称',
    permissionName: '所属权限',
    handlerMethod: "操作方法",
    sourceDescription: "资源描述",
    permissionsDescription: "描述",
    sourceStatus: "资源状态",
    authorityTitle: "所属权限",
  },

  //菜单
  menu: {
    systemId: "场景ID",
    systemName: "场景名称",
    menuId: "菜单编码",
    menuName: "菜单名称",
    parentMenuName: "父菜单名称",
    urlLink: "菜单链接",
    status: "菜单状态",
    menuType: "菜单类型",
    isChildMenu: "是否子菜单",
    linkType: "跳转方式",
    linkId: "跳转编码",
    permissionDescription: "描述",
  },

  //提示
  prompt: {
    prompt: '提示',
    deletePrompt: '此操作将删除',
    delete_success: '删除成功',
    delete_failed: '删除失败',
    isContinue: '是否继续?'
  }
}

