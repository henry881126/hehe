/*
 * @Descripttion: 
 * @version: 
 * @Author: tangpingying
 * @Date: 2020-07-28 09:21:25
 * @LastEditors: tangpingying
 * @LastEditTime: 2020-08-05 20:30:12
 */
import Layout from '@/layout'
export default [{
	path: '/org-manage',
	name: 'org-manage',
	component: Layout,
	redirect: '/org-manage/org-list',
	meta: {
		title: '组织机构管理',
		icon: 'user'
	},
	children: [
		{
			path: '/org-manage/org-list',
			name: 'org-list',
			component: () => import('@/views/ssp/org-manage/org-list'),
			meta: {
				title: '组织机构',
				icon: ''
			}
		},
		{
			path: '/org-manage/orgpost-list',
			name: 'orgpost-list',
			component: () => import('@/views/ssp/org-manage/orgpostrelation-list'),
			meta: {
				title: '机构岗位',
				icon: ''
			}
		},
		{
			path: '/org-manage/orgpostteller-list',
			name: 'orgpostteller-list',
			component: () => import('@/views/ssp/org-manage/orgposttellerrelation-list'),
			meta: {
				title: '机构岗位人员',
				icon: ''
			}
		},
		{
			path: '/org-manage/orgpostrole-list',
			name: 'orgpostrole-list',
			component: () => import('@/views/ssp/org-manage/orgpostrolerelation-list'),
			meta: {
				title: '机构岗位角色',
				icon: ''
			}
		},
		{
			path: '/org-manage/orgip-list',
			name: 'orgip-list',
			component: () => import('@/views/ssp/org-manage/orgiprelation-list'),
			meta: {
				title: '机构IP',
				icon: ''
			},
		},
	]
}]
