<template>
  <div class="bread-crumb">
    
    <bread-crumb ref="crumb" :item="item"></bread-crumb>
    <div class="common-wrapped">
        <div class="common-content">
            <el-tabs v-model="activeName" class="demo-tabs" >
                <el-tab-pane label="帐号详情" name="first">
                    
                    <div class="acccount-info-wrapped">
                        <span>用户头像：</span>
                        <div class="account-info-content">
                            <el-upload
                              class="avatar-uploader"
                              action="http://127.0.0.1:8888/user/uploadAvatar"
                              :show-file-list="false"
                              :on-success="handleAvatarSuccess"
                              :before-upload="beforeAvatarUpload"
                            >
                              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                            </el-upload>     
                        </div>
                    </div>
                    
                    <div class="acccount-info-wrapped">
                      <span>用户帐号：</span>
                      <div class="account-info-content">
                           <el-input v-model="account" style="width: 178px" disabled placeholder="Please input"></el-input>
                      </div>
                    </div>

                    <div class="acccount-info-wrapped">
                      <span>用户密码：</span>
                      <div class="account-info-content">
                        <el-button type="primary" @click="openChangePassword">修改密码</el-button>
                      </div>
                    </div>
                    <div class="acccount-info-wrapped">
                      <span>用户姓名：</span>
                      <div class="account-info-content">
                        <el-input v-model="name" />
                      </div>
                      <div class="account-save-button">
                        <el-button type="primary" @click="savename">保存</el-button>
                      </div>
                    </div>

                    <div class="acccount-info-wrapped">
                      <span>用户性别：</span>
                      <div class="account-info-content">
                        <el-select v-model="sex" placeholder="请选择" style="width: 240px">
                            <el-option label="男" value="male" />
                            <el-option label="女" value="female" />
                        </el-select>
                        
                      </div>
                      <div class="account-save-button">
                        <el-button type="primary" @click="savesex">保存</el-button>
                      </div>
                    </div>

                    <div class="acccount-info-wrapped">
                      <span>用户身份：</span>
                      <div class="account-info-content">
                        <el-input v-model="identity" disabled placeholder="Please input"></el-input>
                    </div>
                    </div>
                    <div class="acccount-info-wrapped">
                      <span>用户部门：</span>
                      <div class="account-info-content">
                        <el-input v-model="department" disabled placeholder="Please input"></el-input>
                      </div>
                    </div>
                    <div class="acccount-info-wrapped">
                      <span>用户邮箱：</span>
                      <div class="account-info-content">
                        <el-input v-model="email" />
                      </div>
                      <div class="account-save-button">
                        <el-button type="primary" @click="saveemail">保存</el-button>
                      </div>
                    </div>
                    
                </el-tab-pane>

                <el-tab-pane label="公司信息" name="second">
                  <div class="acccount-info-wrapped">
                    <span>公司名称</span>
                    <div class="account-info-content">
                      <el-input v-model="companyName" />
                    </div>
                    <div class="account-save-button">
                      <el-button type="primary" @click="changecName">保存</el-button>
                    </div>
                  </div>
                  <div class="acccount-info-wrapped">
                    <span>公司介绍</span>
                    <div class="account-info-content">
                      <el-button type="success" @click="openEditor(1)">编辑公司介绍</el-button>
                    </div>
                  </div>
                  <div class="acccount-info-wrapped">
                    <span>公司架构</span>
                    <div class="account-info-content">
                      <el-button type="success" @click="openEditor(2)">编辑公司介绍</el-button>
                    </div>
                  </div>
                  <div class="acccount-info-wrapped">
                    <span>公司战略</span>
                    <div class="account-info-content">
                      <el-button type="success" @click="openEditor(3)">编辑公司介绍</el-button>
                    </div>
                  </div>
                  <div class="acccount-info-wrapped">
                    <span>现任高层</span>
                    <div class="account-info-content">
                      <el-button type="success" @click="openEditor(4)">编辑公司介绍</el-button>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="首页管理" name="third">
                  <div class="home-wrapped">
                    <div class="tips">
                      <span>提示：点击图片框进行切换首页轮播图</span>
                    </div>
                    <!-- 轮播图 -->
                    <div class="swiper-wrapped" v-for="(item,index) in swiperData" :key="index">
                      <div class="swiper-name">轮播图{{index+1}}:&nbsp;&nbsp;</div>
                      <el-upload class="avatar-uploader" :action="swiperurl"
                        :show-file-list="false" :on-success="handleSwiperSuccess"
                        :before-upload="beforeAvatarUpload" :data='item'>
                        <template #trigger>
                          <img v-if="swiperimageUrl[index]" :src="swiperimageUrl[index]" class="swiper" />
                          <img src="@/assets/雪碧图.png" alt="" v-else>
                        </template>
                      </el-upload>
                    </div>
          
                  </div>
                </el-tab-pane>
                <el-tab-pane label="其他设置" name="fourth">
                  <div class="other-set">
                    <div class="department-set">
                      <span>部门设置</span>
                      <el-tag v-for="tag in dynamicTags" :key="tag" class="mx-1" closable
                        :disable-transitions="false" @close="handleClose(tag)">
                        {{ tag }}
                      </el-tag>
                      <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-20"
                        size="small" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
                      <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
                        + 添加部门
                      </el-button>
                    </div>
                    <div class="product-set">
                      <span>产品设置</span>
                      <el-tag v-for="tag in dynamicProductTags" :key="tag" class="mx-1" closable
                        :disable-transitions="false" @close="handleProductClose(tag)">
                        {{ tag }}
                      </el-tag>
                      <el-input v-if="inputProductVisible" ref="InputProductRef" v-model="inputProductValue" class="ml-1 w-20"
                        size="small" @keyup.enter="handleInputProductConfirm" @blur="handleInputProductConfirm" />
                      <el-button v-else class="button-new-tag ml-1" size="small" @click="showProductInput">
                        + 添加产品
                      </el-button>
                    </div>
                  </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
  </div>
  <change-password ref="change_password"></change-password>
  <editor ref="editorP"></editor>
</template>

<script setup>
import { ref, reactive, toRaw } from 'vue';
import BreadCrumb from '@/components/bread_crumb.vue';
import { storeToRefs } from 'pinia';
const activeName = ref('first')
const item = ref({
    first: '系统设置',
    second: '123'
});
import {
		ElInput
	} from 'element-plus'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import {useUserInfo} from '@/store/userinfo'
import utils from '@/utils'
import {bind, changeName, changeSex, changeEmail} from '@/api/userinfo'
import ChangePassword from './components/change_password.vue'
import editor from './components/editor.vue'
import { bus } from "@/utils/mitt.js"
import {getCompanyName, changeCompanyName, getAllSwiper, getDepartment, setDepartment} from '@/api/setting'

const userInfoStore = useUserInfo();
const { name, sex, department, identity, imageUrl:image_url, account, email } = storeToRefs(userInfoStore);

const companyName = ref('')
const getName = async () => {
  companyName.value = (await getCompanyName()).data
}
getName()
const changecName = async () => {
  const res = (await changeCompanyName(companyName.value))
  console.log(res)
  if(res.data.status === 0){
    utils.showSuccess('修改成功')
  }else{
    utils.showError('修改失败')
  }
}

const AccountDeatailData = reactive({
  account: '',
  name: '',
  sex: '',
  identity: '',
  department: '',
  email: ''
})
const imageUrl = ref()
//头像上传成功的函数
const handleAvatarSuccess = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
  // console.log(response)
  if(response.status === 0){
    image_url.value = response.url
    utils.showSuccess('上传成功');
    (async () => {
      // console.log(account.value)
      await bind(account.value, response.onlyId, response.url)
    })()
  }else{
    utils.showError('上传失败') 
  }
}

//头像上传前的函数
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const change_password = ref(null)
const openChangePassword = () => {
  change_password.value.open()
}

const savename = async () => {
  const res = await changeName(name.value, localStorage.getItem('id'))
  if(res.data.status === 0){
    utils.showSuccess('修改成功')
  }else{
    utils.showError('修改失败')
  }
}

const savesex = async () => {
  const res = await changeSex(sex.value, localStorage.getItem('id'))
  if(res.data.status === 0){
    utils.showSuccess('修改成功')
  }else{
    utils.showError('修改失败')
  }
}

const saveemail = async () => {
  const res = await changeEmail(email.value, localStorage.getItem('id'))
  if(res.data.status === 0){
    utils.showSuccess('修改成功')
  }else{
    utils.showError('修改失败')
  }
}
const company = ref('')
const editorP = ref(null)
const openEditor = (id) => {
  bus.emit('editorTitle', id)
  editorP.value.open()
}

// 首页管理
const swiperData = [{
		name: 'swiper1'
	}, {
		name: 'swiper2'
	}, {
		name: 'swiper3'
	}, {
		name: 'swiper4'
	}, {
		name: 'swiper5'
	}, {
		name: 'swiper6'
	}]

	// 上传轮播图成功
	const handleSwiperSuccess = (
		response
	) => {
		returnAllSwiper()
	}
  const swiperurl = ref('http://127.0.0.1:8888/set/uploadSwiper')
	// 轮播图
	const swiperimageUrl = ref([])
	// 获取轮播图
	const returnAllSwiper = async () => {
    swiperimageUrl.value = (await getAllSwiper()).data
	}
	returnAllSwiper()

  const inputValue = ref('')
	const dynamicTags = ref()
	const inputVisible = ref(false)
	const InputRef = ref ()
	// 产品设置
	const inputProductValue = ref('')
	const dynamicProductTags = ref()
	const inputProductVisible = ref(false)
	const InputProductRef = ref ()
	// 获取部门数据
	const returnDepartment = async() => {
		dynamicTags.value = (await getDepartment()).data
	}
	returnDepartment()
  // 部门设置关闭时的函数
	const handleClose = async (tag) => {
		dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
		const res = await setDepartment(JSON.stringify(toRaw(dynamicTags.value)))
		if (res.data.status == 0) {
			ElMessage({
				message: '删除部门成功',
				type: 'success',
			})
		} else {
			ElMessage.error('删除部门失败，请重新输入！')
		}
	}
</script>

<style lang="scss" scoped="scoped">
  .common-wrapped{
      padding: 8px;
      background: #f5f5f5;
      height: calc(100vh - 101px);
      font-size: 14px;

      .common-content{
          height: 100%;
          background: #fff;
          padding: 0 10px;

          .acccount-info-wrapped{
            display: flex;
            align-items: center;
            padding-left: 50px;
            margin-bottom: 24px;
            .account-info-content{
              margin-left: 24px;
              margin-right: 16px;
            }
          }
      }
      .account-save-button{
        margin-left: 16px;
      }


			.home-wrapped {
				padding-left: 50px;
				display: flex;
				flex-direction: column;

				.tips {
					display: flex;
					align-items: center;
					margin-bottom: 8px;

					span {
						font-size: 14px;
						color: silver;
					}
				}
				.swiper-wrapped {
					display: flex;
					margin-bottom: 16px;

					.swiper-name {
						font-size: 14px;
						margin-bottom: 24px;
					}

					.swiper {
						width: 336px;
						height: 96px;

					}
				}
			}

      /* 其他设置*/
    .other-set {
      padding-left: 50px;
      font-size: 14px;

      .department-set {
        margin-bottom: 24px;

        span {
          margin-right: 24px;
        }
      }
      
      .product-set {
        
        span {
          margin-right: 24px;
        }
      }
    }
  }

  .demo-tabs > .el-tabs__content {
      padding: 32px;
      color: #6b778c;
      font-size: 32px;
      font-weight: 600;
  }

  .avatar-uploader .avatar {
      width: 178px;
      height: 178px;
      display: block;
  }

  :deep(.el-input) {
    width: 240px;
  }
  .el-select{
    width: 240px;
  }
  :deep(.el-input__inner){
    width: 240px;
  }

</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>