<template>
  <el-dialog v-model="loginShow" title="登录" width="30%">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
      <input class="login-input" v-model="loginData.username" style="width: 240px;" placeholder="请输入用户名" clearable type="username" />
      <input class="login-input" v-model="loginData.password" style="width: 240px" placeholder="请输入密码" clearable type="password" />
    </div>
    <br/>
    <div style="text-align: center;">
      <el-button type="success" @click="handleLogin" style="width: 267px;">登录</el-button>
      <div style="display: flex; justify-content: space-between;padding: 0 40px;">
        <p style="font-size: small;color: #666;" @click="switchToSeek">忘记密码</p>
        <p style="font-size: small;color: #666;" @click="switchToRegister">没有账号？注册</p>
      </div>
    </div>
  </el-dialog>

  <el-dialog v-model="registerShow" title="注册" width="30%">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
      <input class="login-input" v-model="input" style="width: 240px;" placeholder="请输入用户名" clearable type="username" />
      <input class="login-input" v-model="input" style="width: 240px" placeholder="请输入密码" clearable type="password" />
      <input class="login-input" v-model="input" style="width: 240px" placeholder="请输入注册邮箱" clearable type="email" />
      <div style="position: relative; width: 266px;">
        <input class="login-input" v-model="input" style="width: 240px" placeholder="请输入邮箱验证码" clearable type="email" />
        <button class="verification-code-btn">获取验证码</button>
      </div>
    </div>
    <br/>
    <div style="text-align: center;">
      <el-button type="success" @click="registerShow = false" style="width: 267px;">注册</el-button>
      <div style="display: flex; justify-content: space-between;padding: 0 40px;">
        <p style="font-size: small;color: #666;" @click="switchToLogin">← 返回</p>
        <p style="font-size: small;color: #666;" @click="switchToSeek">忘记密码</p>
      </div>
    </div>
  </el-dialog>

  <el-dialog v-model="seekShow" title="找回密码" width="30%">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
      <input class="login-input" v-model="input" style="width: 240px" placeholder="请输入注册邮箱" clearable type="email" />
      <div style="position: relative; width: 266px;">
        <input class="login-input" v-model="input" style="width: 240px" placeholder="请输入邮箱验证码" clearable type="email" />
        <button class="verification-code-btn">获取验证码</button>
      </div>
    </div>
    <br/>
    <div style="text-align: center;">
      <el-button type="success" @click="loginShow = false" style="width: 267px;">点击找回</el-button>
      <div style="display: flex; justify-content: space-between;padding: 0 40px;">
        <p style="font-size: small;color: #666;" @click="switchToLogin">← 返回</p>
        <p style="font-size: small;color: #666;" @click="switchToRegister">没有账号？注册</p>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import { loginService } from '@/api/search'
import { useTokenStore } from '@/stores/token.js'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'login-success'])

const tokenStore = useTokenStore()
const loginShow = ref(props.modelValue)
const registerShow = ref(false)
const seekShow = ref(false)
const loginData = ref({})
const input = ref('')

const handleLogin = async () => {
  console.log('loginData:这个是登录数据', loginData.value)
  const result = await loginService(loginData.value)
  console.log('result:这个是登录结果', result)
  result.data.nickname = result.data.nickname || '未登录'
  emit('login-success', {
    avatarUrl: result.data.user.avatarUrl,
    nickname: result.data.user.nickname
  })
  tokenStore.setToken(result.data.token)
  ElNotification({
    title: '登陆成功',
    message: result.data.user.nickname,
    type: 'success',
    position: 'top-left',
  })
  loginShow.value = false
}

const switchToSeek = () => {
  seekShow.value = true
  loginShow.value = false
  registerShow.value = false
}

const switchToRegister = () => {
  registerShow.value = true
  loginShow.value = false
  seekShow.value = false
}

const switchToLogin = () => {
  registerShow.value = false
  loginShow.value = true
  seekShow.value = false
}
</script>

<style scoped>
.login-input {
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
}

.login-input:focus {
  border-color: #31c27c;
}

.verification-code-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #31c27c;
  cursor: pointer;
  font-size: 12px;
}

.verification-code-btn:hover {
  text-decoration: underline;
}
</style>
