<template>
    <div class="common-layout">
      <el-container>
        <el-header class="head-wrapped">
            <div class="head-content">
                <h3>后台管理系统</h3>
                <span class="welcome">Welcome</span>
            </div>
        </el-header>
        <el-main>
            <div class="login-wrapped">
                <el-card class="box-card">
                    <el-tabs v-model="activeName" class="login-form" :stretch="true">

                        <el-tab-pane label="登录" name="first">
                            <el-form label-width="auto"> 
                                <el-form-item label="登录" prop="name">
                                    <el-input v-model="logindata.account" placeholder="请输入帐号" />
                                </el-form-item>
                                <el-form-item label="密码" prop="zone">
                                    <el-input v-model="logindata.passwd" type="password" placeholder="请输入密码" show-password />
                                </el-form-item>
                                <div class="footer-wrapped">
                                    <div class="forget-password">
                                        <span class="forget-password-button" @click="click_open">忘记密码</span>
                                    </div>
                                    <div class="footer-button">
                                        <el-button type="primary" @click="Login">登录</el-button>
                                    </div>
                                    <div class="footer-go-register">
                                        还没有帐号？<span class="go-register">马上注册</span>
                                    </div>
                                </div>
                            </el-form>

                        </el-tab-pane>

                        <el-tab-pane label="注册" name="second" class="register-form">
                            <el-form ref="formRef" :model="form" label-width="auto"> 
                                <el-form-item label="帐号" prop="name">
                                    <el-input v-model="registerData.account" placeholder="请输入" />
                                </el-form-item>
                                <el-form-item label="密码长度6-12位含数字" prop="zone">
                                    <el-input v-model="registerData.passwd" type="password" placeholder="请输入" show-password />
                                </el-form-item>
                                <el-form-item label="请再次输入密码" prop="time">
                                    <el-input v-model="registerData.repasswd" type="password" placeholder="请输入" show-password />
                                </el-form-item>

                                <div class="footer-button">
                                    <el-button type="primary" @click="Register">注册</el-button>
                                </div>
                            </el-form>
                        </el-tab-pane>
                      </el-tabs>
                </el-card>

            </div>    
        </el-main>
        <el-footer class="foot-wrapped">
            <div class="foot-content title">
                <span>aliyun</span> &nbsp;| &nbsp;
                <span>github</span> &nbsp;| &nbsp;
                <span>gitee</span>
                
            </div>
        </el-footer>
      </el-container>
    </div>

    <forgetpassword ref="fpassword"></forgetpassword>
  </template>

<script setup>
import {ref, reactive} from 'vue'
import forgetpassword from './components/forgetpassword.vue'
import {register, login}  from '@/api/login'
import utils from '@/utils'
import {useRouter} from 'vue-router'

const activeName = ref('first')
const router = useRouter()

const logindata = reactive({
    account: '',
    passwd: '',
})

const registerData = reactive({
    account: '',
    passwd: '',
    repasswd: '',
})

const Login = async () => {
    const res = await login(logindata)
    if(res.data.message === '登录成功'){
        utils.showSucess('登录成功')
        localStorage.setItem('token', res.data.token)
        router.push('/menu')
    }else{
        console.log(res)
        utils.showError(res.data.message)
    }
}

const Register = async () => {
    if(registerData.passwd === registerData.repasswd){
        const res = await register(registerData)
        if(res.data.message === '注册成功'){
            utils.showSucess('注册成功')
            activeName.value = 'first'
            
        }else{
            utils.showError(res.data.message)
        }
    }else{
        utils.showError('两次密码不一致')
    }
    // console.log(res)
}


const fpassword = ref(null)
const click_open =  () => {
    console.log(fpassword.value.open)
    fpassword.value.open()
}
</script>

<style lang="scss" scoped>
    .head-wrapped{
        .head-content{
            width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .welcome{
            font-size: 13px;
        }
    }
    .el-main{
        --el-main-padding: 0;
        background-image: url('@/assets/image.png');
        height: 600px;
        .login-wrapped{
            width: 1200px;
            height: 600px;
            margin: 0 auto;
        }
        
    }
    .foot-wrapped{
        margin-top: 10px;
        .foot-content{
            width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .title{
            color: #666;
        }
        span{
            font-size: 16px;
            color: #666;
        }
    }
    .login-wrapped{
        width: 1200px;
        height: 500px;
        margin: 0 auto;
        display: flex;
        justify-content: end;
        align-items: center;
        
        .box-card{
           
            width: 350px;
            height: 375px;
        }
    }
    .el-form{
        margin-top: 30px;
    }

    .login-form{
        .footer-wrapped{
            display: flex;
            flex-direction: column;
            .forget-password{
                display: flex;
                justify-content: flex-end;
                margin: 10px 0;
                .forget-password-button{
                    color: #409eff;
                    font-size: 12px;
                    cursor: pointer;
                }
            }
            .footer-button{
                width: 100%;
                margin: 10px 0;
                display: flex;
                justify-content: center;
            }
            .footer-go-register{
                margin: 12px 0;
                display: flex;
                font-size: 12px;
                justify-content: center;
                .go-register{
                    color: #409eff;
                    cursor: pointer;
                }
            }
        }
    }

    .register-form{
        .footer-button{
            width: 100%;
            margin: 10px 0;
            display: flex;
            justify-content: center;
        }
    }

    :deep(.el-input__inner){
        height: 40px;
    }
    :deep(.el-tabs__item){
        color: #333;
        font-size: 18px;
    }
    :deep(.el-form-item__label){
        height: 40px;
        line-height: 40px;
    }
    :deep(.el-button){
        width: 300px;
        height: 45px;
        font-size: 16px;
    }
</style>