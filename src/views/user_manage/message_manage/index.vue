<template>
	<breadCrumb ref="breadcrumb" :item='item'></breadCrumb>
	<div class="table-wrapped">
		<!-- 顶部 -->
		<div class="table-top">
			<!-- 表格顶部 -->
			<div class="table-header">
				<!-- 搜索框 -->
				<div class="search-wrapped">
					<el-input v-model="adminAccount" class="w-50 m-2" size="large" placeholder="输入账号进行搜索"
						:prefix-icon="Search" @change='searchAdmin()' clearable @clear="clearInput()" />
				</div>
				<div class="button-wrapped">
					<el-button type="primary" @click="openCreate(3)">添加消息管理员</el-button>
				</div>
			</div>
			<!-- 表格内容 -->
			<div class="table-content">
				<el-table :data="tableData" style="width: 100%">
					<el-table-column type="index" width="50" />
					<el-table-column prop="account" label="账号" />
					<el-table-column prop="name" label="姓名" />
					<el-table-column prop="sex" label="性别" />
					<el-table-column prop="department" label="部门" />
					<el-table-column prop="email" label="邮箱" />
					<el-table-column prop="update_time" label="更新时间">
						<template #default="{row}">
							<div>{{row.update_time?.slice(0,10)}}</div>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="200">
						<template #default="{row}">
							<div>
								<el-button type="success" @click="openEdit(row.id)">编辑</el-button>
								<el-button type="danger" @click="openDelete(row.id)">删除</el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<!-- 底部 -->
		<div class="table-footer">
			<el-pagination :page-size="1" :current-page="paginationData.currentPage" :pager-count="7"
				:total="adminTotal" :page-count="paginationData.pageCount" @current-change="currentChange"
				layout="prev, pager, next" />
		</div>
    </div>
	<create-admin ref="createAdmin" />
</template>

<script setup>
	import {
		reactive,
		ref,
		onBeforeUnmount
	} from 'vue'
	import { Search } from '@element-plus/icons-vue'
	import breadCrumb from '@/components/bread_crumb.vue'
	import {
		bus
	} from "@/utils/mitt.js"
	import CreateAdmin from '@/views/user_manage/components/create_admin.vue'

	// 面包屑
	const breadcrumb = ref()
	// 面包屑参数
	const item = ref({
		first: '用户管理',
		second: '消息管理员'
	})

    const tableData = reactive([{
        account: 'admin',
        name:'byteman1',
    }])
    

	// 搜索内容
	const searchAdmin = async () => {
		tableData.value = await searchUser(adminAccount.value, '产品管理员')
		paginationData.pageCount = 1
	}

	// 分页数据
	const paginationData = reactive({
		// 总页数
		pageCount: 50,
		// 当前所处页数
		currentPage: 1,
	})
	

	onBeforeUnmount(() => {
		bus.all.clear()
	})

	const createAdmin = ref()
	const openCreate = (id) => {
		bus.emit('createId', id)
		createAdmin.value.open(id)
	}
</script>

<style lang='scss' scoped>

</style>