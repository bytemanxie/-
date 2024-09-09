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
						:prefix-icon="Search" @change='searchAdmin()' />
				</div>
				<div class="button-wrapped">
					<el-button type="primary" @click="openCreate(1)">添加产品管理员</el-button>
				</div>
			</div>
			<!-- 表格内容 -->
			<div class="table-content">
				<el-table :data="tableData" style="width: 100%">
					<el-table-column prop="id" width="50" />
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
	<create-admin ref="createAdmin" @success="getFirstPageList"/>
	<edit-admin ref="editAdmin" @success="getFirstPageList"/>
	<delete-a ref="deleteA" @success="getFirstPageList"/>
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
	import EditAdmin from '@/views/user_manage/components/edit_admin.vue'
	import { searchUser, getAdminListLength, returnListData } from '@/api/userinfo.js'
	import DeleteA from '@/views/user_manage/components/delete_admin.vue'

	// 面包屑
	const breadcrumb = ref()
	// 面包屑参数
	const item = ref({
		first: '用户管理',
		second: '产品管理员'
	})

    let tableData = ref()
    const adminAccount = ref('')
	// 搜索内容
	const searchAdmin = async () => {
		tableData.value = (await searchUser(adminAccount.value, '产品管理员')).data
		paginationData.pageCount = 1
	}

	// 分页数据
	const paginationData = reactive({
		// 总页数
		pageCount: 50,
		// 当前所处页数
		currentPage: 1,
	})
	const adminTotal = ref(0)
	// 获取管理员的数量
	const returnAdminListLength = async () => {
		const res = (await getAdminListLength('产品管理员')).data
		adminTotal.value = res.length
		// console.log(res)
		paginationData.pageCount = Math.ceil(res.length / 10)
	}
	returnAdminListLength()

	// 默认获取第一页的数据
	const getFirstPageList = async () => {
		tableData.value = (await returnListData(1, '产品管理员')).data
		// console.log(tableData.value)
	}
	getFirstPageList()
	// 监听换页
	const currentChange = async (value) => {
		paginationData.currentPage = value
		tableData.value = (await returnListData(paginationData.currentPage, '产品管理员')).data
	}

	onBeforeUnmount(() => {
		bus.all.clear()
	})

	const createAdmin = ref()
	const openCreate = (id) => {
		bus.emit('createId', id)
		createAdmin.value.open(id)
	}
	const editAdmin = ref()
	const openEdit = (id) => {
		// console.log(id)
		bus.emit('editId', id)
		editAdmin.value.open(id)
	}
	const deleteA = ref()
	const openDelete = (id) => {
		bus.emit('deleteId', id)
		deleteA.value.open(id)
	}
</script>

<style lang='scss' scoped>

</style>