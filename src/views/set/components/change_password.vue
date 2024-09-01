<template>
  <div>
    <el-dialog v-model="state.dialogVisble" title="修改密码" width="400px">
        <el-form label-width="auto" :label-position="labelPosition" :rules="rules"> 
            <el-form-item label="旧密码" prop="old">
                <el-input v-model="passworddata.oldpassword" placeholder="请输入旧密码" type="password" show-password/>
            </el-form-item>
            <el-form-item label="新密码" prop="new">
                <el-input v-model="passworddata.newPassword" placeholder="请输入新密码"  type="password" show-password/>
            </el-form-item>
            
        </el-form>
        <template #footer>
            <el-button @click="state.dialogVisble = false">取 消</el-button>
            <el-button type="primary" @click="changeUserPassword">确 认</el-button>
        </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {ref, reactive } from 'vue'
import { verify, reset } from '@/api/login.js'
import utils from '@/utils'
import {changePassword} from '@/api/userinfo.js'
import {useRouter} from 'vue-router'

const router = useRouter()

const rules = reactive({
    old: [
        { required: true, message: '请输入旧密码', trigger: 'blur' }
    ],
    new: [
        { required: true, message: '请输入新密码', trigger: 'blur' }
    ]
})

const labelPosition = ref('top')

const passworddata = reactive({
    oldpassword: '',
    newPassword: ''
})
const state = reactive({
    dialogVisble: false,
})

const open = () =>  {
    state.dialogVisble = true
}

const changeUserPassword = async () => {
    if(passworddata.oldpassword && passworddata.newPassword){
        const res = await changePassword(localStorage.getItem('id'), passworddata.oldpassword, passworddata.newPassword);
        console.log(res)
        if(res.data.status === 0){
            utils.showSuccess('修改成功')
            state.dialogVisble = false
            router.push('/login')
        }else{
            utils.showError(res.data.message)
        }
    }else{
        utils.showError('检查数据')
    }
    
}

defineExpose ({
  open
});
</script>

<style scoped="scoped">
</style>