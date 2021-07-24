<template>
	<div class="m-list">
		<el-button @click="handleClick">点击</el-button>
	</div>
</template>

<script>
	import {fechAllPranteMenus,createMenu} from "@/api/ssp/user.js"
	export default{
		name:"list",
		methods:{
			handleClick(){
				let data = {
						"postId":"Admin",
						"partyId":"800000",
						"pageNum":"1",
						"pageSize":"10"
				};
				createMenu(data).then((data) => {
				  let allPranteMenus = [];
				})
        // fechAllPranteMenus().then((data)=>{

        // })
			}
		}
	}
</script>

<style>
</style>
