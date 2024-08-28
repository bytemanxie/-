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
                           <el-input v-model="AccountDeatailData.account" style="width: 178px" disabled placeholder="Please input"></el-input>
                      </div>
                    </div>

                    <div class="acccount-info-wrapped">
                      <span>用户密码：</span>
                      <div class="account-info-content">
                        <el-button type="primary">修改密码</el-button>
                      </div>
                    </div>
                    <div class="acccount-info-wrapped">
                      <span>用户姓名：</span>
                      <div class="account-info-content">
                        <el-input v-model="AccountDeatailData.name" />
                      </div>
                      <div class="account-save-button">
                        <el-button type="primary">保存</el-button>
                      </div>
                    </div>

                    <div class="acccount-info-wrapped">
                      <span>用户性别：</span>
                      <div class="account-info-content">
                        <el-select v-model="AccountDeatailData.sex" placeholder="请选择">
                            <el-option label="男" value="male" />
                            <el-option label="女" value="female" />
                        </el-select>
                        
                      </div>
                      <div class="account-save-button">
                        <el-button type="primary">保存</el-button>
                      </div>
                    </div>

                    <div class="acccount-info-wrapped">
                      <span>用户身份：</span>
                      <div class="account-info-content">
                        <el-input v-model="AccountDeatailData.identity" disabled placeholder="Please input"></el-input>
                    </div>
                    </div>
                    <div class="acccount-info-wrapped">
                      <span>用户部门：</span>
                      <div class="account-info-content">
                        <el-input v-model="AccountDeatailData.department" disabled placeholder="Please input"></el-input>
                      </div>
                    </div>
                    <div class="acccount-info-wrapped">
                      <span>用户邮箱：</span>
                      <div class="account-info-content">
                        <el-input v-model="AccountDeatailData.email" />
                      </div>
                      <div class="account-save-button">
                        <el-button type="primary">保存</el-button>
                      </div>
                    </div>
                    
                </el-tab-pane>

                <el-tab-pane label="公司信息" name="second">Config</el-tab-pane>
                <el-tab-pane label="首页管理" name="third">Role</el-tab-pane>
                <el-tab-pane label="其他设置" name="fourth">Task</el-tab-pane>
            </el-tabs>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import BreadCrumb from '@/components/bread_crumb.vue';
const activeName = ref('first')
const item = ref({
    first: '系统设置',
    second: '123'
});

import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const AccountDeatailData = reactive({
  account: '',
  name: '',
  sex: '',
  identity: '',
  department: '',
  email: ''
})

const imageUrl = ref('')

const handleAvatarSuccess = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
}

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

</script>

<style lang="scss" scoped="scoped">
  .common-wrapped{
      padding: 8px;
      background: #f5f5f5;
      height: calc(100vh - 85px);
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