<template>
    <el-dialog v-model="state.dialogVisble" title="忘记密码" width="400px">
        <el-form label-width="auto" :label-position="labelPosition" :rules="rules"> 
            <el-form-item label="登录" prop="account">
                <el-input v-model="logindata.account" placeholder="请输入帐号" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="logindata.email" placeholder="请输入邮箱"  />
            </el-form-item>
            
        </el-form>
        <template #footer>
            <el-button @click="state.dialogVisble = false">取 消</el-button>
            <el-button type="primary" @click="verifyAccount">下一步</el-button>
        </template>
    </el-dialog>
    
</template>

<script setup>
import {ref, reactive } from 'vue'
import { verify, reset } from '@/api/login.js'
import utils from '@/utils'

const rules = reactive({
    account: [
        { required: true, message: '请输入帐号', trigger: 'blur' }
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' }
    ]
})

const labelPosition = ref('top')

const logindata = reactive({
    account: '',
    email: '',
    passwd: '',
    newPassword: ''
})

const state = reactive({
    dialogVisble: false,
    dialogVisble2: false
})

const open = () =>  {
    state.dialogVisble = true
}


// 打开验证邮箱和账号的弹窗
const verifyAccount = async () => {
    const res = await verify(logindata)
    console.log(res)
    if(res.data.status === 0){
        utils.showSucess('验证成功')

        localStorage.setItem('id',res.data.id)
        state.dialogVisble = false
        state.dialogVisble2 = true
    }else{
        utils.showError(res.data.message)
    }
}

// 重置密码
const resetPassword = async() =>{
    if(logindata.passwd === logindata.newPassword){
        const newPassword = logindata.passwd
        // localStorage/sessionStorage.getItem获取我们存储在浏览器的数据
        // 调用接口
        const res = await reset(localStorage.getItem('id'), newPassword)
        if(res.data.status === 0){
            utils.showSucess('修改成功')
            state.dialogVisble2 = false
        }else{
            utils.showError('修改失败,网络错误')
        }
    }else{
        utils.showError('修改失败,请检查密码是否一致')
    }
}

defineExpose ({
  open
});

</script>

<style lang="scss" scoped="scoped">

</style>