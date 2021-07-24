/*
 * @Descripttion: 
 * @version: 
 * @Author: tangpingying
 * @Date: 2020-08-04 09:27:23
 * @LastEditors: tangpingying
 * @LastEditTime: 2020-08-05 21:14:42
 */
import Layout from '@/layout'

export default[
  {
    path: '/system-resource',
    name: 'system-resource',
    component: Layout,
    meta: { title: '系统资源管理', icon: 'user' },
		children:[
			{
				path: '/system-resource/scene-list',
				name: 'scene-list',
				component: () => import('@/views/ssp/system-resource/scene-list'),
				meta: { title: '场景', icon: '' },
			},
			{
			  path: '/system-resource/resource',
			  name: 'resource',
				redirect: '/system-resource/resource-list',
			  component: () => import('@/views/ssp/system-resource/resource'),
			  meta: { title: '资源权限', icon: '' },
			  children: [
					{
						path: '/system-resource/resource-list',
						name: 'resource-list',
						hidden: true, // 不在侧边栏线上
						component: () => import('@/views/ssp/system-resource/resource-list'),
						meta: { title: '资源权限', icon: 'user' },
					},
					{
						path: '/system-resource/resource-add',
						name: 'resource-add',
						hidden: true, // 不在侧边栏线上
						component: () => import('@/views/ssp/system-resource/resource-add'),
						meta: { title: '资源权限-添加', icon: '' }
					},
					{
						path: '/system-resource/resource-modify',
						name: 'resource-modify',
						hidden: true, // 不在侧边栏线上
						component: () => import('@/views/ssp/system-resource/resource-add'),
						meta: { title: '资源权限-修改', icon: '' }
					},
				]
			},
			{
			  path: '/system-resource/menu',
			  name: 'menu',
				redirect: '/system-resource/menu-list',
				component: () => import('@/views/ssp/system-resource/menu'),
			  meta: { title: '菜单管理', icon: '' },
				children: [
					{
						path: '/system-resource/menu-list',
						hidden: true, // 不在侧边栏线上
						name: 'menu-list',
						component: () => import('@/views/ssp/system-resource/menu-list'),
						meta: { title: '菜单管理-列表', icon: 'uer' },
					},
					{
						path: '/system-resource/menu-add',
						hidden: true, // 不在侧边栏线上
						name: 'menu-add',
						component: () => import('@/views/ssp/system-resource/menu-add'),
						meta: { title: '菜单管理-添加', icon: '' },
					}
				]
			},
		]
  },

]
