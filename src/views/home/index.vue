<template>
  <div>
    <bread-crumb ref="crumb" :item="item"></bread-crumb>
    <!-- 首页外壳 -->
    <div class="hom-wrapped">
      <!-- 轮播图外壳 -->
      <div class="swiper-wrapped">
        <el-carousel :interval="4000" type="card" height="320px" indicator-position="outside">
          <el-carousel-item v-for="(item, index) in swiperimageUrl" :key="index">
            <img v-if="swiperimageUrl[index]" :src="swiperimageUrl[index]" class="swiper" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 栅格布局外壳 -->
      <div class="layout-wrapped">
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item,index) in companyIntroduce" :key='index' @click="openIntroduce(index+1)">
            <div class="company-message-area">
              <span>{{item.set_name}}</span>
              <div v-html='item.set_text' class="company-introduce"></div>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 表格外壳 -->
      <div class="two-table-wrapped">
        <div class="company-notice">
          <span>公司公告</span>
          <el-table :data="tableData" style="width: 100%" :show-header="false">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
          </el-table>
        </div>
        <div class="system-message">
          <span>系统消息</span>
          <el-table :data="tableData" style="width: 100%" :show-header="false">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
          </el-table>
        </div>
      </div>
    </div>
  </div>
  <introduce ref="intro" />
</template>

<script setup>
import { ref, reactive } from 'vue';
import BreadCrumb from '@/components/bread_crumb.vue';
import { getAllSwiper, getAllCompanyIntroduce } from '@/api/setting';
import introduce from './components/introduce.vue'
import { bus } from "@/utils/mitt.js"

const item = ref({
    first: '系统设置',
    second: '123'
});

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
	// 轮播图
	const swiperimageUrl = ref([])
	// 获取轮播图
	const returnAllSwiper = async () => {
    swiperimageUrl.value = (await getAllSwiper()).data
    console.log(swiperimageUrl.value)
	}
	returnAllSwiper()

  // 公司介绍
	const companyIntroduce = ref([])
	const returnAllCompanyIntroduce = async () => {
    companyIntroduce.value = (await getAllCompanyIntroduce()).data
	}
	returnAllCompanyIntroduce()

  // 弹窗
	const intro = ref()
	const openIntroduce = (id) => {
		bus.emit('introduce', id)
		intro.value.open()
	}
</script>

<style lang="scss" scoped="scoped">
  @mixin table-class {
		height: 232px;
		width: 48%;
		display: flex;
		flex-direction: column;

	}

	.home-wrapped {
		padding: 8px;
		height: calc(100vh - 101px);
		background: #f5f5f5;
		display: flex;
		flex-direction: column;

		.swiper-wrapped {
			padding: 0 20px;
			background: #fff;
			margin-bottom: 8px;

			.swiper {
				width: 100%;
				height: 100%;
			}
		}
  }

  .layout-wrapped {
    padding: 8px;
    background: #fff;
    margin-bottom: 8px;
    .company-message-area{
      background: #f5f5f5;
      height: 210px;
      padding: 8px;
      cursor: pointer;
      span{
        border-bottom: 1px solid #409eff;
        font-size: 14px;
      }
      .company-introduce {
        text-indent: 24px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
    }
    .company-message-area:hover{
      cursor: pointer;
      background-color: #eef5ff;
      
    }
  }

		.two-table-wrapped {
			height: 232px;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-around;
			background: #fff;

			.company-notice {
				@include table-class
			}


			.system-message {
				@include table-class
			}

			.title {
				font-size: 14px;
				margin-bottom: 5px;
				border-bottom: 1px solid #ea0709;
			}
		}

  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
</style>