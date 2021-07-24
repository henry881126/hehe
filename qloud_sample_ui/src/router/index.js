/*
 * @Descripttion: 
 * @version: 
 * @Author: Ray Haiyoung
 * @Date: 2020-08-04 10:33:58
 * @LastEditors: Ray Haiyoung
 * @LastEditTime: 2020-08-04 11:52:39
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
let myRoutes = [];
// 合并本地路由
const routerContext = require.context('./', true, /index\.js$/)
routerContext.keys().forEach(route => {
  if (route.startsWith('./index')) {
    return
  }
  const routerModule = routerContext(route)
  myRoutes = [...myRoutes,...(routerModule.default || routerModule)];
});


export const constantRoutes = [
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
	...myRoutes,
	{
		path: '/',
	  redirect: '/Layout',
	}
]

// security
// const securityRouter  = {
//   path: '/security',
//   component: Layout,
//   redirect: '/security/index',
//   name: 'SecurityModule',
//   meta: { title: 'Security', icon: 'example' },
//   children: [
//     {
//       path: 'index',
//       name: 'SecurityIndex',
//       component: () => import('@/views/security'),
//       meta: { title: 'security 安全配置', icon: 'table' },
//     },
//   ]
// };

const createRouter = () => new Router({
  // mode: 'history', // require service support
  mode:"hash",
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
  // routes: constantRoutes.concat(asyncRoutes)
  // routes: constantRoutes.concat(securityRouter)
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
