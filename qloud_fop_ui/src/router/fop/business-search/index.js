/*
 * @Author: LeiRuiQi
 * @Date: 2020-07-28 10:36:36
 * @LastEditors: LeiRuiQi
 * @LastEditTime: 2020-08-05 19:32:51
 */ 

import Layout from '@/layout'

export default [
	{
		path: '/flow',
		name: 'flow',
		component: Layout,
		redirect: '/flow/flow-instance-search',
		meta: { title: '业务查询', icon: 'icon' },
		children: [
			{
				path: '/flow-instance-search',
				name: 'FlowInstanceSearch',
				component: () => import('@/views/fop/business-search/flow-instance-search'),
				meta: { title: '流程实例' },
			},
			{
				path: '/history-instance-search',
				name: 'HistoryInstanceSearch',
				component: () => import('@/views/fop/business-search/history-instance-search'),
				meta: { title: '历史实例' },
			},
			{
				path: '/to-do-task-view',
				name: 'toDoTaskView',
				redirect: '/to-do-tasks',
				component: () => import('@/views/fop/business-search/to-do-task-view'),
				meta: { title: '待办任务' },
				children: [
					{
						path: "/to-do-tasks",
						name: "toDoTasks",
						component: () => import('@/views/fop/business-search/to-do-tasks'),
						hidden: true
					},
					{
						path: 'task-jump',
						name: "taskJump",
						component: () => import('@/views/fop/business-search/tasks-jump'),
						hidden: true
					},
				],
			},
			{
				path: '/tasked-search',
				name: 'taskedSearch',
				component: () => import('@/views/fop/business-search/tasked-search'),
				meta: { title: '已办任务' },
			},
			{
				path: '/message-send',
				name: 'messageSend',
				component: () => import('@/views/fop/business-search/message-send'),
				meta: { title: '消息发送' },
			},
		]
	}
];
