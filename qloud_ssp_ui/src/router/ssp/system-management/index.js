/*
 * @Descripttion: 
 * @version: 
 * @Author: tangpingying
 * @Date: 2020-07-31 14:23:19
 * @LastEditors: tangpingying
 * @LastEditTime: 2020-08-05 20:58:56
 */
import Layout from '@/layout'

export default[
  {
		path: '/system-management',
		redirect: '/ssp/system-management/user',
		meta: { title: '用户管理', icon: 'lock' },
    component: Layout,
    children: [
      {
        path: 'user-list',
        name: 'user-list',
        component: () => import('@/views/ssp/system-management/user-list'),
        meta: { title: '用户管理', icon: '' }
      },
      {
        path: 'user-add',
        name: 'user-add',
        hidden: true,
        component: () => import('@/views/ssp/system-management/user-add'),
      },      
      {
        path: 'role-list',
        name: 'role-list',
        component: () => import('@/views/ssp/system-management/role-list'),
        meta: { title: '角色管理', icon: '' }
      },   
      {
        path: 'station-list',
        name: 'station-list',
        component: () => import('@/views/ssp/system-management/station-list'),
        meta: { title: '岗位管理', icon: '' }
      }, 
      {
        path: 'jurisdiction-list',
        name: 'jurisdiction-list',
        component: () => import('@/views/ssp/system-management/jurisdiction-list'),
        meta: { title: '权限管理', icon: '' }
      },                      
    ]
      
    },     
]