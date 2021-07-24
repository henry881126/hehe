<!--
 * @Descripttion:
 * @version:
 * @Author: Ray Haiyoung
 * @Date: 2020-08-04 10:33:58
 * @LastEditors: Ray Haiyoung
 * @LastEditTime: 2020-08-04 11:46:57
-->
<template>
	<div>
		<popup
		:isShow="isShow"
		:size="size"
		:footerList="footerList"
		v-on:senddialogVisible="getdialogVisible">
			<template slot="content">
				<p>{{ $t('demo.navbar.dashboard') }}</p>
        <a>{{ceshi}}</a>
				<tableView
				:operateObj = "tableData.operate"
				:tableHeaderData = "tableData.paramTableHeader"
				:tableData = "tableData.paramData"
				:isPage = "tableData.isPage"
				v-on:operate="getIndex" />
			</template>
		</popup>
	</div>
</template>

<script>
	export default{
		name:"Home",
		data(){
			return{
				isShow:true,
        ceshi:this.$t("demo.navbar.dashboard"),
				size:"medium",
				footerList:[{"name":"取消",type:"","isSubmit":false},{"name":"确定",type:"primary","isSubmit":true}],
				tableData:{
					isPage:true,
					operate:{
						width:200,
						list:["编辑1","查看2","编辑3","查看4","编辑5","查看6"]
					},
					showOverflowTooltip:true,
					paramTableHeader:[
						{prop:'name',label:'过程名称'},
						{prop:'tags',label:'过程标签'},
						{prop:'time',label:'更新时间'}
					],
					paramData:[
						{name:"查看目录",tags:"日常巡检",time:"2019-03-24 17:07:54",value:""},
						{name:"查看目录",tags:"日常巡检",time:"2019-03-24 17:07:54",value:""},
						{name:"查看目录",tags:"日常巡检",time:"2019-03-24 17:07:54",value:""},
						{name:"查看目录",tags:"日常巡检",time:"2019-03-24 17:07:54",value:""},
						{name:"查看目录",tags:"日常巡检",time:"2019-03-24 17:07:54",value:""},
					]
				},
			}
		},
		methods:{
			getIndex(e){
				console.log(e);
			},
			getdialogVisible(flag){
				if(flag){

				}
				this.isShow=false;
			}
		}
	}
</script>

<style>
</style>
